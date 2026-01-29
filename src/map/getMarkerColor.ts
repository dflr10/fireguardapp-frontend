export function getMarkerColor(status: string) {
  switch (status) {
    case "en_proceso":
      return "#ff9500"; // naranja
    case "cerrada":
      return "#9092ae"; // gris
    default:
      return "#ff2121"; // verde
  }
}
