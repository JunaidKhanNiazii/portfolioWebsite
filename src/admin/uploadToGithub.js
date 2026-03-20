/**
 * Uploads a file to GitHub via the Contents API.
 * Returns the raw.githubusercontent.com URL.
 */
export async function uploadToGithub(file) {
  const username = import.meta.env.VITE_GITHUB_USERNAME
  const repo     = import.meta.env.VITE_GITHUB_REPO
  const token    = import.meta.env.VITE_GITHUB_TOKEN

  if (!token || token === 'your_github_pat_here') {
    throw new Error('VITE_GITHUB_TOKEN is not set. Add it to your .env and Vercel env vars.')
  }

  // Convert file to base64
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result.split(',')[1])
    reader.onerror   = reject
    reader.readAsDataURL(file)
  })

  // Unique filename: timestamp + original name (sanitised)
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path     = `public/images/projects/${Date.now()}_${safeName}`

  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `upload project image: ${safeName}`,
        content: base64,
      }),
    }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub upload failed (${res.status})`)
  }

  const data = await res.json()
  // Return the raw URL so it can be used directly in <img> tags
  return `https://raw.githubusercontent.com/${username}/${repo}/main/${path}`
}
