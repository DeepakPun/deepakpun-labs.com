export interface NavItem {
  id: string
  label: string
  icon: string
}

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { id: 'architecture', label: 'System Architecture', icon: '📐' },
  { id: 'deployment', label: 'CI/CD Pipelines', icon: '🚀' },
  { id: 'kanban', label: 'Project Pipeline', icon: '📊' },
]
