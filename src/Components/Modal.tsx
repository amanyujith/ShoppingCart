import Button from "../Utilities/Button";
interface ModalProps{
    isOpen:boolean,
    title:string,
    content?:string,
    buttonText?:string,
    cancel:string
    onCancel:()=>void,
    buttonAction?:()=>void,
}
export const Modal =({isOpen,title,content,buttonText,onCancel,cancel,buttonAction}:ModalProps)=>{
    if(!isOpen) return null;
    return <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold mb-4 text-black"> {title}</h1>
            <p className="mb-4">{content}</p>
            <div className="flex justify-end gap-4">
                <Button value={cancel} onClick={onCancel}/>
                {buttonAction && (
                    <Button value={buttonText||''} onClick={buttonAction}/>
                )}
            </div>
        </div>
    </div>
}
