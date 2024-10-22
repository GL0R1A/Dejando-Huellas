const API_URL = process.env.API_URL || 'http://localhost:8080'; 

exports.infoQR = (req, res) => {
  res.render('infoQr', { layout: false });
};
exports.infoReporteAparicion = (req, res) => {
  res.render('infoReporteAparcion', { layout: false });
};
exports.mascotaQR = async (req, res) => {
  try {
      const { identificador_qr } = req.params;
      const response = await fetch(`${API_URL}/api/infoqr/${identificador_qr}`);
      const mascota = await response.json();

      if (!mascota) {
          return res.status(404).json({ message: 'Mascota no encontrada' });
      }

      res.json(mascota);
  } catch (error) {
      console.error('Error al obtener la mascota:', error);
      res.status(500).json({ message: 'Error al obtener la información de la mascota' });
  }
};

exports.reporteAparecidos = async (req, res) =>{
  try {
    
    const response = await fetch(`${API_URL}/api/nuevo/reporteApa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Reporte Enviado', resulta: result });
    } else {
      res.status(400).json({ message: result.message || 'Error al enviar reporte' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }

}
exports.reporteDesaparecidos = async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/api/nuevo/reporteDes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    // Intentar parsear la respuesta
    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      // Si la respuesta no es JSON válido
      return res.status(502).json({ message: 'Error al interpretar la respuesta del servidor' });
    }

    if (response.ok) {
      res.status(200).json({ message: 'Reporte Creado', resulta: result });
    } else {
      // Manejo de errores específicos del servidor
      res.status(response.status).json({ message: result.message || 'Error al crear reporte' });
    }
  } catch (error) {
    // Si ocurre algún error durante la solicitud o al intentar contactar la API
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

exports.getReporteDesaparecidos = async (req, res) => {
  try {
      const response = await fetch(`${API_URL}/api/get/reporteDes`); // Llama a la API externa
      const reporteDes = await response.json();

      if (!reporteDes || reporteDes.length === 0) {
          return res.status(404).json({ message: 'No hay reportes de desaparecidos' });
      }

      res.json(reporteDes);
  } catch (error) {
      console.error(error); // Log del error en el servidor
      res.status(500).json({ message: 'Error al obtener la información del reporte' });
  }
};
exports.eliminarReporte = async (req, res) => {
  try {
    // Obtener el id de la mascota de la solicitud
    const { mascota_id } = req.params;

    // Enviar los datos a la API
    const response = await fetch(`${API_URL}/api/deleteReport/${mascota_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
     
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({ message: 'Reporte eliminado' });
    } else {
      res.status(400).json({ message: result.message || 'Error al eliminar el reporte' });
    }
  } catch (error) {
    console.error('Error al eliminar el reporte:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getReporteAperecidos = async (req, res) => {
  try {
      const { identificador_qr } = req.params;
      const response = await fetch(`${API_URL}/api/get/reporteApa/${identificador_qr}`);
      const mascota = await response.json();

      if (!mascota) {
          return res.status(404).json({ message: 'Reporte no encontrado' });
      }

      res.json(mascota);
  } catch (error) {
      console.error('Error al obtener el reporte:', error);
      res.status(500).json({ message: 'Error al obtener la información de la mascota' });
  }
};

