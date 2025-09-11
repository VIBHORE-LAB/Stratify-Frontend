import { NavBar } from "../components/NavBar"

export default function PreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-black w-full text-foreground">
      <header className="border-b">
        <NavBar />
      </header>
      <main>{children}</main>
    </div>
  )
}
