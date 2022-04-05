import Image from "next/image";
import Link from "next/link";
import disneyLogo from "../public/disney_logo.png";

const Navbar = ({ account }) => {
  return (
    <div className="navbar">
      <Link href="/">
        <Image
          className="disneyLogo"
          src={disneyLogo}
          alt="Dinsey logo"
          width={90}
          height={50}
        />
      </Link>
      <div className="accountInfo">
        <p>Welcome {account.username}</p>
        <img className="accountAvatar" src={account.avatar.url} />
      </div>
    </div>
  );
};

export default Navbar;
