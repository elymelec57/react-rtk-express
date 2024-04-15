import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../features/login/loginSlice';
import { useNavigate } from 'react-router-dom';

const NavMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loginUser } = useSelector(
        (state) => state.login
    );

    const salir = () =>{
        dispatch(logout());
        navigate('/')
    }

    return (
        <>
        <div className="grid-cols-12">
            <header className=''>
                <nav className="relative flex w-full items-center justify-between bg-white py-2 mb-3 shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
                    data-twe-navbar-ref>
                    <div className="flex w-full flex-wrap items-center justify-between px-3">
                        <div className="flex items-center">

                            <button
                                className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                                type="button"
                                data-twe-collapse-init
                                data-twe-target="#navbarSupportedContentY"
                                aria-controls="navbarSupportedContentY"
                                aria-expanded="false"
                                aria-label="Toggle navigation">

                                <span
                                    className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </span>
                            </button>
                        </div>

                        <div
                            className="!visible hidden grow basis-[100%] items-center text-center lg:!flex lg:basis-auto lg:text-left"
                            id="navbarSupportedContentY"
                            data-twe-collapse-item>
                            <ul
                                className="me-auto flex flex-col lg:flex-row"
                                data-twe-navbar-nav-ref>
                                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                    <Link to="/employes">
                                    <a
                                        className="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                        href=""
                                        data-twe-nav-link-ref
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                    >Lista de empleados</a>
                                    </Link>
                                </li>
                                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                    <Link to="/create">
                                    <a
                                        className="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                        href=""
                                        data-twe-nav-link-ref
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                    >Crear empelado</a>
                                    </Link>
                                </li>
                                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                    <Link to='/profile'>
                                    <a
                                        className="block text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                        href=""
                                        data-twe-nav-link-ref
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                    >{loginUser.name}</a>
                                    </Link>
                                </li>
                                <li className="mb-2 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                                <button onClick={salir} className="inline-block w-full rounded bg-primary px-3 pb-2 pt-1 text-sm text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30"> salir </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
        </>
    );
}

export default NavMenu;