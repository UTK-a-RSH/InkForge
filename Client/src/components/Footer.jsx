import { Footer, FooterCopyright, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import { SiReplit } from "react-icons/si";
import { BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import React from 'react'
import { Link } from 'react-router-dom';

function FooterComp() {
  return (
    <Footer container className='border border-t-8 border-red-600'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
          <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-x1 font-semibold dark:text-white'>
        <span className='px-2 py-2 bg-gradient-to-r from-red-700 via-black to-black rounded-xl text-white'>INK</span>Forge
    </Link>
          </div>

          <div className='grid grid-cols-2 gap-12 mt-4 sm:grid-cols-3 sm:gap-12'> 
            <div>
            <Footer.Title title='About'/>
        <Footer.LinkGroup col>
          <Footer.Link href='https://www.freecodecamp.org/' target='_blank' rel='noopener noreferrer'>
            FreeCode Camp
          </Footer.Link>
          <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
            InkForge
          </Footer.Link>
        </Footer.LinkGroup>
            </div>
            <div>
            <FooterTitle title='Follow Me'></FooterTitle>
        <FooterLinkGroup col>
          <FooterLink href='https://github.com/UTK-a-RSH' target='_blank' rel='noopener noreferrer'>
            Github
          </FooterLink>
          <FooterLink href='https://x.com/BeziersCurve' target='_blank' rel='noopener noreferrer'>
            X/Twitter
          </FooterLink>
        </FooterLinkGroup>
            </div>

            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div >
          </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="InkForge"
            year={new Date().getFullYear()}
          />
          <div className='flex gap-8 sm:mt-0 mt-4 sm:justify-center'>
           
            <Footer.Icon href='https://replit.com/@UtkarshTripath9' icon={SiReplit}/>
            <Footer.Icon href='https://github.com/UTK-a-RSH' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

          </div>
          
        </div>
      </div>
    </Footer>
  )
}

export default FooterComp