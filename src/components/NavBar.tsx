import * as React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

export const NavBar: React.FC = () => {
  // keep this height in sync with the spacer below
  const NAV_HEIGHT = 64;

  return (
    <>
      <nav className="fixed w-full inset-x-0 top-0 z-50">
          <div
            className="flex items-center justify-between  px-6 py-3
                       bg-black/30 backdrop-blur-md backdrop-saturate-150 border-b border-white/10 shadow-sm
                       "
            style={{
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
              height: NAV_HEIGHT,
            }}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <span className="text-xl text-white font-bold">Stratify</span>
            </div>

            {/* right */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="!border border-gray-600 text-white hover:bg-gray-900/30 hover:text-white">
                <Link to="/login">Login</Link>
              </Button>

              <Button className="bg-[linear-gradient(90deg,#3EE997,#06b6d4)] text-black hover:opacity-95">
                <Link to="/register">Register</Link>
              </Button>
            </div>
        </div>
      </nav>

      <div style={{ height: NAV_HEIGHT }} aria-hidden />
    </>
  );
};
