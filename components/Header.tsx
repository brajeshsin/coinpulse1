'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../app/public/fullogo.svg'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Header = () => {
    const pathname = usePathname();
  return (
    <header>
        <div className='main-container inner'>
            <Link href='/'>
            <Image
            src={Logo}
            alt='CoinPulselogo'
            width={135}
            height={40}
            />
            </Link>
            <nav>
                <Link href='/' className={cn('nav-link',{
                    'is-active':pathname ==='/',
                    'is-home':true
                })}>
                Home
                 </Link>
                 <p>Search Modal</p>
                 <Link href="/coins"
                 className={cn('nav-link',{
                    "is-active":pathname==='/coins'
                 })}
                 >
                 All Coins
                 </Link>
            </nav>

        </div>
    </header>
  )
}

export default Header