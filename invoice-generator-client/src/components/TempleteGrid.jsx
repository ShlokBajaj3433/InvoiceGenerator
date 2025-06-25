import { templates } from '../assets/assets'
import '../index.css'

function TempleteGrid({ onTemplateChange }) {
return (
        <div style={{ overflowY: 'auto' }} className="row gap-3">
                <h2 className='text-center form-main-heading py-3'><>Template</></h2>
                {templates.map(({ id, label, img }) => (
                        <div className="col-0 col-sm-0 col-lg-0" key={id}>
                                <div className="border rounded shadow-sm overflow-hidden template-hover cursor-pointer" title={label} onClick={() => onTemplateChange(id)}>
                                        <img src={img} alt={label} className='w-100' loading='lazy'/>
                                        <div className="p-2">
                                                <h5 className='text-center'><b>{label}</b></h5>
                                        </div>
                                </div>
                        </div>
                ))}
        </div>
)
}

export default TempleteGrid