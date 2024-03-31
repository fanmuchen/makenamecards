import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import autotable plugin if you need table formatting
import './assets/huawenxingkai-normal.js';

export const exportToPDF = (names: string, width: number, height: number) => {
  var scale = Math.min(width / 17, height / 17.96);
    const nameList = names.trim().split(/[,，、/\\\n]+/).map(name => name.trim());
    console.log(nameList);
    const doc = new jsPDF({ unit: 'cm', format: 'a4' });
  
    doc.setFont('huawenxingkai');
    doc.setFontSize(115*scale);
    
    console.log(doc.getFontList())

    nameList.forEach((name, index) => {
        if (index !== 0) {
          doc.addPage(); // Add a new page before printing each name except the first one
        }
        var rotate_diviation = 12*scale
        if (name.length === 4) {
          rotate_diviation = 16.5*scale
        }
        if (name.length === 2) {
          // Split the string into an array of characters
          var characters = name.split('');
          // Insert 2 spaces between each character
          name = characters.join('   ');
          rotate_diviation = 11*scale
        }
        
        doc.text(name, 10.5 + rotate_diviation, height*(1/4-1/9),{
          angle: 180,
          align: 'center',
        });

        doc.text(name, 10.5, height*(3/4+1/9),{
          align: 'center',
        });
        doc.line(0, height, 100, height, 'F')
        doc.line(10.5 + width/2, 0, 10.5 + width/2, 29.7, 'F')
        doc.line(10.5 - width/2, 0, 10.5 - width/2, 29.7, 'F')
      });

    doc.save('name_cards.pdf');
  };