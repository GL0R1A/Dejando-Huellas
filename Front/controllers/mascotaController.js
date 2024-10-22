// controllers/mascotaController.js
//import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(module => module.default(...args));

const API_URL = process.env.API_URL || 'http://localhost:8080'; // Valor por defecto si no existe la variable

exports.showIndex = (req, res) => {
  res.render('index');
};


exports.showMisMascotas= (req, res) => {
  res.render('misMascotas');
};
exports.showreportesMascotas= (req, res) => {
  res.render('reportes');
};
exports.vistaImpresion = (req, res) => {


  res.render('imprimir', { layout: false });

};

exports.showDetalles= (req, res) => {
  res.render('detalles-mascota');
};
exports.showVacunas= (req, res) => {
  res.render('vacunas');
};

exports.obtenerEspecies = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/api/mascotas/especies`);
    const especies = await response.json();
    res.json(especies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las especies' });
  }
};

exports.obtenerVacunas = async (req, res) => {
  try {
    const mascota_id = req.params.id;
    const response = await fetch(`${API_URL}/api/mascotas/vacunas/${mascota_id}`);
    const vacunas = await response.json();
    res.json(vacunas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las vacunas' });
  }
};


exports.obtenerGeneros = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/api/mascotas/generos`);
    const generos = await response.json();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los géneros' });
  }
};

exports.misMascotas = async (req, res) => {
  try {
    const propietarioId = req.session.propietarioId;
    const response = await fetch(`${API_URL}/api/mascotas/mismascotas/${propietarioId}`);
    const mascotas = await response.json();
    res.json(mascotas);

  } catch (error) {
    res.status(500).json({ message: 'No se encontraron' });
  }
};





exports.registrarMascota = async (req, res) => {
  try {
    // Enviar los datos a la API
    const response = await fetch(`${API_URL}/api/mascotas/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Mascota registrada con éxito', resulta: result });
    } else {
      res.status(400).json({ message: result.message || 'Error al registrar mascota' });
    }
  } catch (error) {
    console.error('Error al registrar la mascota:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.actualizarMascota = async (req, res) => {
  try {
    // Obtener el id de la mascota de la solicitud
    const { mascota_id } = req.params;

    // Enviar los datos a la API
    const response = await fetch(`${API_URL}/api/mascotas/update/${mascota_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Mascota actualizada' });
    } else {
      res.status(400).json({ message: result.message || 'Error al actualizar mascota' });
    }
  } catch (error) {
   
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
exports.eliminarMascota = async (req, res) => {
  try {
    // Obtener el id de la mascota de la solicitud
    const { mascota_id } = req.params;

    // Enviar los datos a la API
    const response = await fetch(`${API_URL}/api/mascotas/delete/${mascota_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
     
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Mascota eliminada' });
    } else {
      res.status(400).json({ message: result.message || 'Error al eliminar mascota' });
    }
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.registrarVacunacion= async (req, res) => {
  try {
    // Enviar los datos a la API
    const response = await fetch(`${API_URL}/api/mascotas/vacunas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Vacunación registrada con éxito', resulta: result });
    } else {
      res.status(400).json({ message: result.message || 'Error al guardar el registro de vacunacion' });
    }
  } catch (error) {
    console.error('Error al registrar vacunación', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.actualizarVacunacion= async (req, res) => {
  try {
    const { id_vacunacion } = req.params;

    // Enviar los datos a la API
    const response = await fetch(`${API_URL}/api/mascotas/vacunas/update/${id_vacunacion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Vacunación actualizada con éxito', resulta: result });
    } else {
      res.status(400).json({ message: result.message || 'Error al actualizar el registro de vacunacion' });
    }
  } catch (error) {
    console.error('Error al actualizar vacunación', error);
    res.status(500).json({ message: 'Error interno del servidor', eerr });
  }
};

exports.eliminarVacunacion = async (req, res) => {
  try {
    // Obtener el id de la mascota de la solicitud
    const { id_vacunacion } = req.params;

    // Enviar los datos a la API
    const response = await fetch(`${API_URL}/api/mascotas/vacunas/${id_vacunacion}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
     
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Vacuna eliminada' });
    } else {
      res.status(400).json({ message: result.message || 'Error al eliminar vacuna' });
    }
  } catch (error) {
    console.error('Error al eliminar la vacuna:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getReporteimprimir = async (req, res) => {
  const { mascota_id} = req.params;
  try {
    const response = await fetch(`${API_URL}/api/mascotas/vacunas/imprimir/${mascota_id}`);
    const inforeporte = await response.json();
    res.json(inforeporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la informacion de la mascota' });
  }
};


// mascotaController.js
exports.showConsejos = (req, res) => {
  // Definir las entradas de blog manualmente
  const entradas = [
    {
        titulo: "Vacunación y Prevención de Enfermedades",
        contenido: "La vacunación es crucial para proteger a las mascotas de enfermedades graves y potencialmente mortales. Es importante seguir un calendario de vacunación recomendado por los veterinarios y mantener actualizados los registros de vacunación."
    },
    
    {
        titulo: "Control de Parásitos",
        contenido: "Los parásitos como pulgas, garrapatas y lombrices pueden afectar la salud de las mascotas. Es importante realizar controles regulares y seguir tratamientos preventivos recomendados por los veterinarios."
    },
    {
        titulo: "Higiene y Cuidado Personal",
        contenido: "El cuidado regular del pelaje, las uñas y los dientes de las mascotas es vital para su salud general. La higiene adecuada previene problemas de piel y enfermedades dentales."
    },
    {
        titulo: "Socialización y Comportamiento",
        contenido: "La socialización temprana y el entrenamiento adecuado son fundamentales para el desarrollo de un comportamiento equilibrado. Esto incluye la exposición a diferentes personas, animales y entornos."
    },
    {
        titulo: "Atención Veterinaria Regular",
        contenido: "Las visitas periódicas al veterinario son esenciales para el cuidado preventivo y la detección temprana de problemas de salud. Mantén un registro de las visitas y consultas médicas."
    },
    {
        titulo: "Uso de Collares con Placas QR para Mascotas Perdidas",
        contenido: "Los collares con placas QR son una herramienta tecnológica innovadora para prevenir que las mascotas se pierdan. Al escanear el código QR con un smartphone, cualquier persona que encuentre a tu mascota puede acceder a información de contacto y detalles importantes, facilitando su rápida devolución."
    },
    
    {
        titulo: "Seguridad en el Hogar para Perros y Gatos",
        contenido: "Asegurar tu hogar es fundamental para prevenir accidentes y garantizar la seguridad de tus mascotas. Revisa y elimina posibles peligros, como productos tóxicos, cables eléctricos expuestos y objetos pequeños que puedan ser ingeridos. Crea espacios seguros donde tus mascotas puedan moverse libremente."
    },
    {
      "titulo": "La importancia de los collares inteligentes para mascotas",
      "contenido": "Los collares inteligentes permiten un seguimiento constante de la actividad física y la ubicación de tu mascota. Estos dispositivos pueden alertarte si tu perro o gato se aleja de su zona segura o si tiene una baja actividad física, ayudando a prevenir la obesidad y mejorar su salud general. Además, muchos de estos collares tienen funciones de monitoreo de salud, como el ritmo cardíaco y la calidad del sueño, lo que permite detectar problemas antes de que se agraven."
    },
    {
      "titulo": "¿Por qué es esencial vacunar a tu mascota?",
      "contenido": "Las vacunas son fundamentales para proteger a tu mascota contra enfermedades peligrosas como la rabia, moquillo y parvovirus. Al mantener al día el calendario de vacunación, no solo cuidas la salud de tu perro o gato, sino que también proteges a otros animales y personas. Un sistema de notificación de vacunación, como el que ofrece este sistema, te ayudará a recordar las fechas importantes para asegurar que tu mascota esté siempre protegida."
    },
    {
      "titulo": "Identificación mediante códigos QR: Una herramienta clave para mascotas perdidas",
      "contenido": "Agregar un código QR al collar de tu mascota puede marcar la diferencia si se extravía. Con un escaneo rápido, cualquier persona que encuentre a tu mascota puede acceder a su información básica, incluyendo tus datos de contacto, facilitando una rápida reunión. Esta tecnología es fácil de implementar y asegura que incluso si tu mascota pierde su placa tradicional, siempre será identificable."
    },
    {
      "titulo": "Alimentación balanceada para una vida larga y saludable",
      "contenido": "La dieta es clave en la salud de cualquier mascota. Proporcionar alimentos balanceados y ricos en nutrientes esenciales ayudará a tu perro o gato a mantener un peso saludable, tener energía y prevenir enfermedades. Consulta siempre con tu veterinario para conocer las mejores opciones alimenticias para tu mascota, dependiendo de su raza, tamaño y edad."
    },
    {
      "titulo": "La importancia del ejercicio diario en mascotas",
      "contenido": "El ejercicio regular no solo mantiene a tu mascota en forma, sino que también mejora su bienestar mental. Paseos diarios, juegos de buscar la pelota o juguetes interactivos pueden ayudar a reducir el estrés y la ansiedad en mascotas. Los collares inteligentes también permiten monitorear su nivel de actividad, asegurándote de que tu mascota esté recibiendo el ejercicio necesario para mantenerse saludable."
    },
    {
      "titulo": "Higiene dental: Un factor clave para la salud de tu mascota",
      "contenido": "La salud bucal es un aspecto que muchos propietarios tienden a descuidar. Sin embargo, la acumulación de sarro y las infecciones en las encías pueden derivar en problemas graves de salud. Cepillar los dientes de tu mascota regularmente y ofrecerle juguetes dentales son formas sencillas de mantener su boca sana y prevenir enfermedades cardíacas y renales."
    },
    {
      "titulo": "Monitoreo de la salud en tiempo real con dispositivos",
      "contenido": "Los dispositivos, como los collares inteligentes, ofrecen un monitoreo continuo de los signos vitales de tu mascota. Estas herramientas permiten detectar cambios sutiles en su comportamiento o salud que podrían pasar desapercibidos de otro modo, dándote la oportunidad de actuar rápidamente ante cualquier anomalía. Esto es especialmente útil para mascotas con condiciones crónicas que requieren atención constante."
    },
    {
      "titulo": "Protección contra pulgas y garrapatas: Un paso esencial en el cuidado de tu mascota",
      "contenido": "Las pulgas y garrapatas no solo causan molestias, sino que también pueden transmitir enfermedades graves a tu mascota. Mantener un régimen de control antiparasitario, tanto en tu hogar como en tu mascota, es crucial para evitar problemas como la anemia, la enfermedad de Lyme y otros padecimientos. Asegúrate de consultar con tu veterinario sobre los mejores productos preventivos según el tamaño y tipo de tu mascota."
    }
];


  // Definir los videos manualmente
  const videos = [
      {
          titulo: "Tengo una mascota ¿Cómo cuidar a nuestras mascotas?",
          videoid: "z6qn2YzE54M"
      },
      {
          titulo: "Cuidado de mascotas, La Educación Sana",
          videoid: "T-UPNLaWSKU" // Reemplaza con el ID real del video
      },
      {
          titulo: "7 CONSEJOS para CUIDAR la SALUD de tu PERRO",
          videoid: "TbgB5zH8_3E" // Reemplaza con el ID real del video
      },
      {
          titulo: "Conoce 5 responsabilidades de tener una mascota",
          videoid: "dX4yefV2H_A" // Reemplaza con el ID real del video
      },
      {
          titulo: "Cómo ayudar a un gato callejero: Consejos para rescatar, cuidar y adoptar",
          videoid: "cmaN3kXbv7s" // Reemplaza con el ID real del video
      },
      {
          titulo: "Tenencia responsable: los cuidados básicos que debe tener con una mascota",
          videoid: "618Fk4PhnY4" // Reemplaza con el ID real del video
      }
  ];

  // Renderiza la vista y pasa las entradas y videos
  res.render('consejos', { entradas, videos });
};





