import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export const generatePDFfromElement = async(Element, filename="invoice.pdf", returnBlob = false) => {
   const canvas = await html2canvas(Element, {
    scale:2,
    useCORS:true,
    background: "#ffffff",
    scrollY: -window.scrollY
})
 

const imgData = canvas.toDataURL("image/jpeg")
const pdf = new jsPDF("p","pt","a4");
const imgProps = pdf.getImageProperties(imgData)
const pdfWidth = pdf.internal.pageSize.getWidth()
const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight)

if(returnBlob){
    return pdf.output("blob")
}else {pdf.save(filename)}

}
