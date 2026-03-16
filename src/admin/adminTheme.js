export const ACCENT = 'hsl(217,80%,55%)'

export function useT(dark) {
  return {
    bg:      dark ? 'hsl(240,10%,4%)'        : 'hsl(220,20%,97%)',
    nav:     dark ? 'hsl(240,10%,7%)'        : '#ffffff',
    card:    dark ? 'hsl(240,10%,8%)'        : '#ffffff',
    border:  dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    heading: dark ? 'hsl(220,12%,98%)'       : 'hsl(240,10%,8%)',
    body:    dark ? 'hsl(220,12%,65%)'       : 'hsl(220,10%,40%)',
    muted:   dark ? 'hsl(220,12%,40%)'       : 'hsl(220,10%,60%)',
    input:   dark ? 'hsl(240,10%,12%)'       : 'hsl(220,20%,97%)',
    inputBd: dark ? 'hsl(240,10%,20%)'       : 'hsl(220,15%,85%)',
    tag:     dark ? 'hsl(217,60%,18%)'       : 'hsl(217,80%,93%)',
    tagText: dark ? 'hsl(217,80%,72%)'       : 'hsl(217,80%,38%)',
    shadow:  dark ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.06)',
    danger:  '#ef4444',
    success: '#22c55e',
  }
}

export const emptyForm = {
  title: '', description: '', githubLink: '', websiteLink: '',
  tags: '', features: '', imageUrl: '', images: [],
}
