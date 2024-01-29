"use client";

import { Logout, Search } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();

  // Set Navbar background when scrolling down
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const [search, setSearch] = useState<string>("");

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className={`navbar ${isScrolled && "bg-black-1"}`}>
      <Link href="/">
        <img src="/assets/logo.png" alt="logo" className="logo" />
      </Link>

      <div className="nav-links">
        <Link href="/" className="link">
          Home
        </Link>
        <Link href="/my-list" className="link">
          My List
        </Link>
      </div>

      <div className="nav-right">
        <div className="search">
          <input
            placeholder="Search movie..."
            className="input-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            className="icon"
            onClick={() => router.push(`/search/${search}`)}
          />
        </div>

        <img
          src="/assets/profile_icon.jpg"
          alt="profile"
          className="profile"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="dropdown-menu">
            <Link href="/">
              Home
            </Link>
            <Link href="/my-list">
              My List
            </Link>
            <p onClick={handleLogout}>Log out</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
