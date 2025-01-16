import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaHome,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black text-[#949494] py-20 font-titleFont">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-5">
                {/* Section 1: Informations sur le site */}
                <div className="flex flex-col gap-5">
                    <h2 className="text-white text-xl font-bold">À propos</h2>
                    <p className="text-sm">
                        Bienvenue sur notre site. Découvrez les meilleures offres et services. Nous nous engageons à offrir des produits de qualité avec une expérience utilisateur exceptionnelle.
                    </p>
                </div>

                {/* Section 2: Liens utiles */}
                <div className="flex flex-col gap-5">
                    <h2 className="text-white text-xl font-bold">Liens utiles</h2>
                    <ul className="flex flex-col gap-3">
                        <li>
                            <a href="/" className="hover:text-white transition">
                                Accueil
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-white transition">
                                À propos
                            </a>
                        </li>
                        <li>
                            <a href="/services" className="hover:text-white transition">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-white transition">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Réseaux sociaux */}
                <div className="flex flex-col gap-5">
                    <h2 className="text-white text-xl font-bold">Suivez-nous</h2>
                    <p className="text-sm">
                        Restez connectés avec nous sur nos réseaux sociaux :
                    </p>
                    <div className="flex gap-4">
                        <FaFacebookF className="text-white text-lg cursor-pointer hover:text-blue-500 transition" />
                        <FaTwitter className="text-white text-lg cursor-pointer hover:text-blue-400 transition" />
                        <FaInstagram className="text-white text-lg cursor-pointer hover:text-pink-500 transition" />
                        <FaYoutube className="text-white text-lg cursor-pointer hover:text-red-500 transition" />
                    </div>
                </div>
            </div>

            {/* Mention de copyright */}
            <div className="border-t border-gray-700 mt-10 pt-5 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} VotreSite.com - Tous droits réservés.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

