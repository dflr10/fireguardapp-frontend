export function getMarkerColor(status: string) {
  switch (status) {
    case "En proceso":
      return "#ff9500"; // naranja
    case "Cerrada":
      return "#9092ae"; // gris
    default:
      return "#ff2121"; // verde
  }
}
