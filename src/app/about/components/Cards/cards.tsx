'use client'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import React from 'react';


const TechCards = () => {
  return (
    <div className='flex gap-6 mt-6'>
        <Card className="py-4">
            <CardHeader className="pb-2 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Next.JS</h4>
            <small className="text-default-500">12 Tracks</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 bg-slate-600">
            <Image
                alt="Next.JS"
                className="object-cover rounded-xl p-2"
                src='/Nextjs.png'
                width={220}
            />
            </CardBody>
        </Card>

        <Card className="py-4">
            <CardHeader className="pb-2 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">Typescript</h4>
            <small className="text-default-500">12 Tracks</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2 bg-slate-600">
            <Image
                alt="Next.JS"
                className="object-cover rounded-xl p-2"
                src='/Typescript.png'
                width={220}
            />
            </CardBody>
        </Card>

        <h4>and libraries:</h4>

    </div>
    

    

// Next.js https://nextjs.org/
// Typescript https://www.typescriptlang.org/
// NextUI library for UI https://nextui.org/docs/guide/introduction
// Framer Motion for animations https://www.framer.com/motion/
// react hook form https://react-hook-form.com/
// react infinite scroll component https://github.com/ankeetmaini/react-infinite-scroll-component
// react icons https://react-icons.github.io/react-icons/

    // {/* <div className={styles.logos}>
    // <div className={styles.logos__logo}>
    //   <Image src="/Nextjs.png" alt='Next.js logo' layout='fill' className={'image'}/>
    // <div className={styles.logos__logo}>
    //   <Image src="/Typescript.png" alt='Tailwind logo' layout='fill' className={'image'}></Image>
    // </div>
    // <div className={styles.logos__logo}>
    //   <Image src="/Tailwind.png" alt='Tailwind logo' layout='fill' className={'image'}></Image>
    // </div>
    // </div> */}
  );
};

export default TechCards;
