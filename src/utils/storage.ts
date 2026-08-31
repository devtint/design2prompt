import { ThemeConfig } from '../types/theme';

const TEMPLATES_KEY = 'design2prompt_saved_templates';
const AUTOSAVE_KEY = 'design2prompt_autosave';

export interface SavedTemplate {
  id: string;
  name: string;
  updatedAt: number;
  theme: ThemeConfig;
}

export function getSavedTemplates(): SavedTemplate[] {
  try {
    const raw = localStorage.getItem(TEMPLATES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to get saved templates', err);
    return [];
  }
}

export function saveTemplate(name: string, theme: ThemeConfig): SavedTemplate[] {
  const templates = getSavedTemplates();
  const newTemplate: SavedTemplate = {
    id: `tpl_${Date.now()}`,
    name: name.trim() || 'Untitled Theme',
    updatedAt: Date.now(),
    theme: { ...theme, name: name.trim() || 'Untitled Theme' },
  };

  const updated = [newTemplate, ...templates];
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteTemplate(id: string): SavedTemplate[] {
  const templates = getSavedTemplates();
  const updated = templates.filter(t => t.id !== id);
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
  return updated;
}

export function autosaveTheme(theme: ThemeConfig) {
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(theme));
  } catch (err) {
    console.error('Autosave failed', err);
  }
}

export function getAutosavedTheme(): ThemeConfig | null {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
