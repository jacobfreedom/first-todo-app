import Nav from '@/components/NavigationBar';
import React from 'react';
import TechCards from './components/Cards/cards';

const AboutPage: React.FC = () => {


  return (
    <main className='flex flex-col mx-auto my-0 w-full'> 
      <Nav />

      <div className='flex flex-col w-10/12 mx-auto'>
        <h1 className='mt-6 font-semibold'>This project was built with:</h1>

        <TechCards />

      
      Next.js https://nextjs.org/
      Typescript https://www.typescriptlang.org/
      NextUI library for UI https://nextui.org/docs/guide/introduction
      Framer Motion for animations https://www.framer.com/motion/
      react hook form https://react-hook-form.com/
      react infinite scroll component https://github.com/ankeetmaini/react-infinite-scroll-component
      react icons https://react-icons.github.io/react-icons/
      
      by Jakub as my first CRUD app to learn React. 

      And a project to land a Frontend Developer job with.

      Button - Let me share my story

      I'll make this basic part quick for you.

      Name: Jakub Svoboda
      Age: 26
      Additional skills: interest and basics of UX/UI, Figma, Adobe Photoshop, Premiere, After Effects
      Hobbies: at the end as a bonus emoji
      </div>
    </main>

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

export default AboutPage;




