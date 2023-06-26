  "use client";

  import Link from 'next/link';
  import Image from 'next/image';
  import { useState, useEffect } from 'react';
  import { signIn, signOut, getProviders, useSession } from 'next-auth/react';
  import { Provider } from '@interfaces/interfaces';

  const Nav: React.FC = () => {  
    const { data: session } = useSession();
    const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
    useEffect(() => {
      const fetchProviders = async () => {
        const response = await getProviders();
        setProviders(response);
      }
      fetchProviders();
    }, []);

    return (
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href='/' className="flex gap-2 flex-center">
          <Image 
            src='/assets/images/logo.svg'
            alt='logo'
            width={30}
            height={30}
            className="object-contain"  
          />
          <p className="logo_text">Promptopia</p>
        </Link>
        {/* Dektop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href='/create-prompt' className="black_btn">
                Create Post
              </Link>
              <button type='button' onClick={() => signOut({})} className="outline_btn">
                Sign Out
              </button>
              <Link href="/profile">
                {session?.user.image && (
                  <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt='profile'/>
                )}
              </Link>
            </div>
          ) : (
            <>
              {providers && 
                Object.values(providers).map((provider) => 
                ( <button 
                    type='button' 
                    key={provider.name} 
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))
              }
            </>
            )
          }
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
              <div className="flex">
                {session?.user.image && (
                  <Image 
                    src={session?.user.image}
                    alt='profile'
                    width={37}
                    height={37}
                    className="rounded-full"
                    onClick={() => setToggleDropdown((prev) => !prev)}  
                  />
                )}
                {toggleDropdown && (
                  <div className="dropdown">
                    <Link href='/profile' className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                      My Profile
                    </Link>
                    <Link href='/create-prompt' className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                      Create Prompt
                    </Link>
                    <button type='button' onClick={() => {setToggleDropdown(false); signOut()}} className="mt-5 w-full black_btn">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {providers && 
                  Object.values(providers).map((provider) => 
                  ( <button 
                      type='button' 
                      key={provider.name} 
                      onClick={() => signIn(provider.id)}
                    >
                      Sign In
                    </button>
                  ))
                }
              </>
            )}
        </div>  
      </nav>
    )
  }

  export default Nav;
