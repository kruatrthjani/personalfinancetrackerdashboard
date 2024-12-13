import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

export default function Header() {
  return (
    <div className="bg-blue-600 text-white sticky top-0 z-10 w-full shadow-lg">
      <ul className="flex justify-around items-center py-4">
        <li className="font-bold text-xl">Logo</li>
        <span className="flex gap-x-10">
          <li className="hover-border">
            <Link to="home" smooth={true} duration={500}>Home</Link>
          </li>
          <li className="hover-border">
            <Link to="budget" smooth={true} duration={500}>Budget</Link>
          </li>
          <li className="hover-border">
            <Link to="reports" smooth={true} duration={500}>Reports</Link>
          </li>
        </span>
        <li>
          <p></p>
        </li>
      </ul>
    </div>
  );
}
