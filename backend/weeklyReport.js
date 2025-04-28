// backend/weeklyReport.js

const nodemailer = require('nodemailer');
const Notification = require('./models/Notification');

// Función para obtener datos de rendimiento (simulados; reemplaza con consulta real)
async function getPerformanceDataForWeek() {
  return [
    { name: "Alice", tasksCompleted: 12 },
    { name: "Bob", tasksCompleted: 15 },
    { name: "Charlie", tasksCompleted: 9 }
  ];
}

// Genera la URL del gráfico usando QuickChart API
async function generatePerformanceChart(collaboratorPerformanceData) {
  const labels = collaboratorPerformanceData.map(item => item.name);
  const data = collaboratorPerformanceData.map(item => item.tasksCompleted);
  
  const chartConfig = {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Tareas Completadas',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Rendimiento Semanal de Colaboradores'
      }
    }
  };

  const quickChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
  return quickChartUrl;
}

// Envía el reporte semanal por correo y guarda la notificación
async function sendWeeklyReportEmail() {
  const collaboratorPerformanceData = await getPerformanceDataForWeek();
  const chartUrl = await generatePerformanceChart(collaboratorPerformanceData);

  const htmlContent = `
    <h1>Reporte Semanal de Rendimiento</h1>
    <p>Estimado Director,</p>
    <p>A continuación se muestra el rendimiento de cada colaborador de esta semana:</p>
    <img src="${chartUrl}" alt="Gráfico de Rendimiento" style="max-width: 600px;"/>
    <p>Saludos,<br/>Sistema de Gestión de Actividades</p>
  `;

  // Configuración de nodemailer usando Mailtrap
  let transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: 'f1e174b7d39628',
      pass: '0c1e24ce702448'
    }
  });

  let mailOptions = {
    from: '"Sistema de Tareas" <noreply@tareas.com>',
    to: 'f1e174b7d39628@sandbox.mailtrap.io',
    subject: 'Reporte Semanal de Rendimiento',
    html: htmlContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el reporte semanal:', error);
    } else {
      console.log('Reporte semanal enviado:', info.messageId);
      console.log('Vista previa:', nodemailer.getTestMessageUrl(info));
      // Guarda la notificación en la base de datos
      new Notification({ message: 'Reporte semanal enviado correctamente.' })
        .save()
        .then(() => console.log('Notificación guardada en historial.'))
        .catch(err => console.error('Error guardando notificación:', err));
      // Emite la notificación en tiempo real
      if (global.io) {
        global.io.emit('notification', 'Reporte semanal enviado.');
      }
    }
  });
}

module.exports = { 
  sendWeeklyReportEmail,
  getPerformanceDataForWeek,
  generatePerformanceChart 
};

