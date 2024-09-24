import { useEffect, useRef, useState } from 'react';
import { Logo } from '../Logo/Logo';
import cl from './Loader.module.scss';

interface DotPosition {
   x: number;
   y: number;
}

export const Loader = () => {
   // const [dotOPosition, setDotOPosition] = useState<DotPosition>({
   //    x: 0,
   //    y: 0,
   // });
   // const [dotQPosition, setDotQPosition] = useState<DotPosition>({
   //    x: 0,
   //    y: 0,
   // });

   // const velocityX = 80; // Горизонтальная скорость
   // const gravity = 900; // Гравитация (ускорение по Y)
   // const bounceDamping = 0.5; // Коэффициент потери энергии при отскоке
   // const initialBounceHeightO = 86; // Начальная высота для первой точки
   // const initialBounceHeightQ = 100; // Начальная высота для второй точки
   // const floorY = 0; // "Пол" (нижняя часть лого)
   // const finalDotO = { x: 120, y: 23 }; // Конечные координаты для первой точки
   // const finalDotQ = { x: 169, y: 23 }; // Конечные координаты для второй точки

   // useEffect(() => {
   //    let startTime: number | null = null;
   //    let requestId: number;

   //    const animateDots = (timestamp: number) => {
   //       if (!startTime) startTime = timestamp;
   //       const elapsed = (timestamp - startTime) / 1000; // Время в секундах

   //       // Горизонтальное движение с постоянной скоростью
   //       const newDotOX = Math.min(finalDotO.x, velocityX * elapsed);
   //       const newDotQX = Math.min(finalDotQ.x, velocityX * elapsed * 1.05); // Немного быстрее для второй точки

   //       // Параболическое движение (имитация прыжков)
   //       const bounceTimeO = elapsed % 2; // Период отскока (каждые 2 секунды)
   //       const bounceTimeQ = (elapsed % 2) * 1.2; // Другой период для второй точки

   //       // Высота отскока уменьшается с каждым циклом
   //       const newDotOY = Math.min(
   //          finalDotO.y,
   //          floorY -
   //             initialBounceHeightO *
   //                Math.pow(bounceDamping, Math.floor(elapsed / 2)) *
   //                Math.abs(Math.sin(Math.PI * bounceTimeO)),
   //       );

   //       const newDotQY = Math.min(
   //          finalDotQ.y,
   //          floorY -
   //             initialBounceHeightQ *
   //                Math.pow(bounceDamping, Math.floor(elapsed / 2)) *
   //                Math.abs(Math.sin(Math.PI * bounceTimeQ)),
   //       );

   //       // Если точки достигли конца, сбросить анимацию
   //       if (
   //          newDotOX >= finalDotO.x &&
   //          newDotOY >= finalDotO.y &&
   //          newDotQX >= finalDotQ.x &&
   //          newDotQY >= finalDotQ.y
   //       ) {
   //          // startTime = timestamp; // Перезапуск анимации
   //       }

   //       // Обновляем состояние для каждой точки
   //       setDotOPosition({ x: newDotOX, y: newDotOY });
   //       setDotQPosition({ x: newDotQX, y: newDotQY });

   //       requestId = requestAnimationFrame(animateDots);
   //    };

   //    requestId = requestAnimationFrame(animateDots);

   //    return () => cancelAnimationFrame(requestId); // Очищаем анимацию при демонтировании
   // }, []);

   const [dotOPosition, setDotOPosition] = useState<DotPosition>({
      x: 0,
      y: 0,
   });
   const [dotQPosition, setDotQPosition] = useState<DotPosition>({
      x: 0,
      y: 0,
   });

   const velocityX = 57; // Горизонтальная скорость
   const gravity = 900; // Гравитация (ускорение по Y)
   const bounceDamping = 0.5; // Коэффициент потери энергии при отскоке
   const initialBounceHeightO = 70; // Начальная высота для первой точки
   const initialBounceHeightQ = 90; // Начальная высота для второй точки
   const floorY = -18; // "Пол" (нижняя часть лого)
   const logoMiddleY = -39; // Средняя линия лого по вертикали
   const finalDotO = { x: 110, y: logoMiddleY }; // Конечные координаты для первой точки
   const finalDotQ = { x: 167, y: logoMiddleY }; // Конечные координаты для второй точки

   useEffect(() => {
      let startTime: number | null = null;
      let requestId: number;

      const animateDots = (timestamp: number) => {
         if (!startTime) startTime = timestamp;
         const elapsed = (timestamp - startTime) / 1000; // Время в секундах

         // Горизонтальное движение с постоянной скоростью
         const newDotOX = Math.min(finalDotO.x, velocityX * elapsed * 2.1);
         const newDotQX = Math.min(finalDotQ.x, velocityX * elapsed * 4); // Немного быстрее для второй точки

         // Условия для остановки точки в середине лого по вертикали
         const stopAtMiddleO = newDotOX >= finalDotO.x;
         const stopAtMiddleQ = newDotQX >= finalDotQ.x;

         // Параболическое движение (имитация прыжков) до того, как точки достигнут конечной позиции
         const bounceTimeO = elapsed % 2; // Период отскока
         const bounceTimeQ = (elapsed % 2) * 1.2; // Другой период для второй точки

         const newDotOY = stopAtMiddleO
            ? finalDotO.y // Останавливаем на конечной позиции
            : Math.min(
                 //   finalDotO.y,
                 floorY -
                    initialBounceHeightO *
                       Math.pow(bounceDamping, Math.floor(elapsed / 2)) *
                       Math.abs(Math.sin(Math.PI * bounceTimeO)),
              );

         const newDotQY = stopAtMiddleQ
            ? finalDotQ.y // Останавливаем на конечной позиции
            : Math.min(
                 //   finalDotQ.y,
                 floorY -
                    initialBounceHeightQ *
                       Math.pow(bounceDamping, Math.floor(elapsed / 2)) *
                       Math.abs(Math.sin(Math.PI * bounceTimeQ)),
              );

         // Обновляем состояние для каждой точки
         setDotOPosition({ x: newDotOX, y: newDotOY });
         setDotQPosition({ x: newDotQX, y: newDotQY });

         requestId = requestAnimationFrame(animateDots);
      };

      requestId = requestAnimationFrame(animateDots);

      return () => cancelAnimationFrame(requestId); // Очищаем анимацию при демонтировании
   }, []);

   return (
      <div className={cl.loaderContainer}>
         {/* <div className={cl.loader}></div> */}
         <div className={cl.logoContainer}>
            <Logo className={cl.logo} />
            <div
               className={[cl.dot, cl.dotO].join(' ')}
               // ref={dotORef}
               style={{
                  transform: `translate(${dotOPosition.x}px, ${dotOPosition.y}px)`,
                  width: '16px',
                  height: '16px',
               }}
            />
            <div
               className={[cl.dot, cl.dotQ].join(' ')}
               // ref={dotQRef}
               style={{
                  transform: `translate(${dotQPosition.x}px, ${dotQPosition.y}px)`,
                  width: '16px',
                  height: '16px',
               }}
            />
         </div>
      </div>
   );
};
