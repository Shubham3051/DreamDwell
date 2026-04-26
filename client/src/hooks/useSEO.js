// import { useEffect } from 'react';

// /**
//  * Sets document title and meta description for the current page.
//  * Title is appended with " | BuildEstate"
//  */
// export function useSEO({ title, description }) {
//   useEffect(() => {
//     if (title) {
//       document.title = `${title} | BuildEstate`;
//     }

//     if (description) {
//       let meta = document.querySelector('meta[name="description"]');

//       if (!meta) {
//         meta = document.createElement('meta');
//         meta.name = 'description';
//         document.head.appendChild(meta);
//       }

//       meta.content = description;
//     }

//     // Cleanup on unmount
//     return () => {
//       document.title =
//         'BuildEstate - AI-Powered Luxury Real Estate | Find Your Dream Home';
//     };
//   }, [title, description]);
// }