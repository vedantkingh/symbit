import Image from 'next/image';
import React from 'react';

const HeroComponent = () => {
    return (
        <div className="flex flex-col items-left justify-center w-1/2 h-screen bg-white p-8">
            <div>
                <Image src="/symbit_logo.svg" alt="Symbit logo" width={150} height={37} />
            </div>
            <div className="flex flex-col items-center justify-center p-16">
                <div className="text-5xl font-bold my-12 text-lightBlack">
                    Easily Craft <span className="text-darkOrange">Personalized Emails using AI</span> for any Company with our intuitive Platform.
                </div>
                <div className="text-black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>

        </div>
    );
};

export default HeroComponent;