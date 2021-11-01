export const getPanelHeight = (panel:React.RefObject<HTMLInputElement> | null): string => {
  if (panel === null) return ""
  const panelHeight = !(panel.current === null) 
    ? panel.current.children[0].clientHeight
    : ""
  return `${panelHeight}px`;
}