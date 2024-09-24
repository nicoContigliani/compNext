"use client"
export const obtenerGeolocalizacion = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => resolve({ latitude, longitude }),
        error => reject(error)   
  
      );
    });
  };
  
  // Ejemplo de uso:
  obtenerGeolocalizacion()
    .then((posicion:any) => {

  
      // Aquí puedes utilizar la latitud y longitud para hacer una petición a Meteosource
    })
    .catch(error => {
      console.error('Error al obtener la geolocalización:', error);
    });