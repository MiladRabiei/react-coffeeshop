import React from 'react'
import { useEffect } from 'react';
export default function Cms() {

      useEffect(() => {
          const savedTheme = JSON.parse(localStorage.getItem("theme")); // Get the theme value as a boolean
          if (savedTheme) {
              document.documentElement.classList.add("dark"); // Instead of document.body
  
          } else {
              document.documentElement.classList.remove("dark"); // Instead of document.body
  
          }
      }, []);
  return (
    <div>Cms</div>
  )
}
