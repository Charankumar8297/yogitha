// // import RNHTMLtoPDF from 'react-native-html-to-pdf';
// // import * as Sharing from 'expo-sharing';

// // export async function generatePdf(data) {
// //   try {
// //     const htmlContent = `
// //       <h1>Scanned Details</h1>
// //       <p>${data}</p>
// //     `;

// //     const options = {
// //       html: htmlContent,
// //       fileName: 'Scanned_Details',
// //       directory: 'Documents',
// //     };

// //     const file = await RNHTMLtoPDF.convert(options);

// //     if (file.filePath) {
// //       await Sharing.shareAsync(file.filePath);
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     alert('Failed to generate PDF');
// //   }
// // }



// import RNHTMLtoPDF from 'react-native-html-to-pdf';

// export async function generatePdf(data) {
//   const options = {
//     html: `<h1>Scanned Data</h1><p>${data}</p>`,
//     fileName: 'scanned_data',
//     directory: 'Documents',
//   };
//   const file = await RNHTMLtoPDF.convert(options);
//   console.log('PDF file:', file.filePath);
// }













import RNHTMLtoPDF from 'react-native-html-to-pdf';

export async function generatePdf(data) {
  try {
    const options = {
      html: `<h1>Scanned Data</h1><p>${data}</p>`,
      fileName: `scanned_data_${Date.now()}`,
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);
    console.log('PDF saved at:', file.filePath);
    return file.filePath;
  } catch (err) {
    console.error('PDF generation error:', err);
  }
}
