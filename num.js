const axios = require('axios');
const ExcelJS = require('exceljs');
 const fs = require('fs')
async function readExcelFile(filePath) {
  const workbook = new ExcelJS.Workbook();
  let number = ''; // Initialize the variable outside the try-catch block

  try {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);

    console.log('Worksheet:', worksheet);

    var i = 1;  
    var arr = [];
    

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {  
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        arr.push(`${cell.value}`);
      
      });
    });

      settings(arr);
  } catch (error) {
    console.error('Error reading the Excel file:', error.message);
  }
}

function settings(arr) {
  var arr = [...new Set(arr)];
  arr.forEach(function(b){
    const settings = {
      url: 'https://api.ultramsg.com/instance48414/messages/image',
      method: 'POST',
      headers: {},
      data: {
        token: 'lndro8l060uwkp7j',
        to: b,
        // filename:'Hello.pdf',
         image:'https://new11.s3.ap-south-1.amazonaws.com/pic/386762.jpg',
       //   image: fs.readFile('./picture.jpeg'),
        caption:"Today IMAGE",
        //  body: "Is this your whatsapp number Please verify "
      }
    };
    
    axios(settings)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    });

  }

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

const filePath = 'D:\\Book1.xlsx'; // Replace with the correct file path
readExcelFile(filePath);


