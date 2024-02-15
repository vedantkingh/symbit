import React from 'react';

interface SettingsModalProps {
    isVisible: boolean;
    onClose: any;
}
  
const SettingsModal: React.FC<SettingsModalProps> = ({ isVisible, onClose}) => {
    if ( !isVisible ) return null;

    const handleClose = (e:any) => {
        if( e.target.id === 'wrapper' ) onClose();
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-40" onClick={handleClose} id='wrapper'>
            <div className="w-1/3 flex flex-col">
                <button className="text-white text-xl place-self-end" onClick={onClose}>X</button>
                <div className="flex flex-col items-center justify-center bg-white text-lightBlack p-2 rounded">
                    <div className="font-semibold text-lg">Settings</div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;