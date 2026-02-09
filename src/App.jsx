import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import {useRef, useState} from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);


function App() {
    const main = useRef();
    const smoother = useRef();


    const scrollTo = () => {
        smoother.current.scrollTo('.box-c', true, 'center center');
    };


    useGSAP(
        () => {
            // create the smooth scroller FIRST!
            smoother.current = ScrollSmoother.create({
                smooth: 2, // seconds it takes to "catch up" to native scroll position
                effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
            });
          /*  ScrollTrigger.create({
                trigger: '.box-c',
                pin: true,
                start: 'center center',
                end: '+=300',
                markers: true,
            });*/
        },
        { scope: main }
    );

    const minWidth = 240
    const maxWidth = 550
    const padding = 10

    let occupiedPositions = []

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function isOverLapping (x, y, width, height, positions) {
        return positions.some(pos => {
            return (
                x < pos.x + pos.width + padding &&
                x + width > pos.x - padding &&
                y < pos.y + pos.height + padding &&
                y + height > pos.y - padding
            )
        })
    }

    function getRandomPositionAndSize (maxX, maxY, card) {
        let x, y
        let attempts = 0
        const maxAttempts = 100
        const width = getRandomInt(minWidth, maxWidth)
        const height = Math.floor(width * 2 / 3)

        do {
            x = Math.floor(Math.random() * (maxX - width))
            y = Math.floor(Math.random() * (maxY - height))
            attempts++
            if (attempts > maxAttempts) {
                console.warn(`Невозможно разместить карточку ${card.textContent}!`)
                return null
            }
        } while (isOverLapping(x, y, width, height, occupiedPositions))

        let depth
        const widthRatio = (width - minWidth) / (maxWidth - minWidth)
        if (widthRatio < 0.33) depth = getRandomInt(1, 2)
        else if (widthRatio < 0.66) depth = getRandomInt(2, 3)
        else depth = getRandomInt(4, 5)

        return {x, y, width, height, depth}
    }

    function placeCards () {
        const mainHeader = document.querySelector('.main-header')
        const cards = document.querySelectorAll('.card')

        const maxX = mainHeader.clientWidth
        const maxY = mainHeader.clientHeight
        occupiedPositions = []

        cards.forEach(card => {
            const cardInfo = getRandomPositionAndSize(maxX, maxY, card)

            if (cardInfo) {
                const {x, y, width, height, depth} = cardInfo

                card.style.left = `${x}px`
                card.style.top = `${y}px`
                card.style.width = `${width}px`
                card.style.height = `${height}px`
                card.dataset.depth = depth

                occupiedPositions.push({x, y, width, height})
            } else {
                card.style.display = 'none'
            }
        })
    }


    window.onload = () => {
        const mainHeader = document.querySelector('.main-header')
        if (!mainHeader) return

        mainHeader.addEventListener('mousemove', (e) => {
            const mainHeaderRect = mainHeader.getBoundingClientRect()
            const centerX = mainHeaderRect.width / 2
            const centerY = mainHeaderRect.height / 2
            const mouseX = (e.clientX - mainHeaderRect.left - centerX) / centerX
            const mouseY = (e.clientY - mainHeaderRect.top - centerY) / centerY

            mainHeader.style.setProperty('--mouse-x', mouseX)
            mainHeader.style.setProperty('--mouse-y', mouseY)
        })
        window.addEventListener('resize', placeCards)


        placeCards()

    }

    return (
        <div className='wrapper' ref={main}>
            <div className="content" id="smooth-content">

                <div>
                    <header className="main-header">

                        <div className="logo"><span>.</span>ne</div>

                        <a href="#" className="add-new">Add New</a>

                        <div className="head-text">
                            <h1><span>E</span>vents for<br/>the week</h1>
                        </div>

                        {/*.card*8>img[src="src/assets/images/$.jpg"][alt="Alt"]+h3>lorem3^p>lorem10*/}
                        <div className="card"><img src="src/assets/images/1.jpg" alt="Alt"/>
                            <h3>Lorem ipsum dolor.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, excepturi?</p>
                        </div>
                        <div className="card"><img src="src/assets/images/2.jpg" alt="Alt"/>
                            <h3>Aut ipsum, placeat.</h3>
                            <p>Eius ipsam iure odio quasi quisquam recusandae sed totam voluptas.</p>
                        </div>
                        <div className="card"><img src="src/assets/images/3.jpg" alt="Alt"/>
                            <h3>Impedit, ipsum porro.</h3>
                            <p>At debitis dolor eius esse, necessitatibus possimus quidem? Assumenda, dolores.</p>
                        </div>
                        <div className="card"><img src="src/assets/images/4.jpg" alt="Alt"/>
                            <h3>Aperiam et, necessitatibus?</h3>
                            <p>Accusantium animi aperiam, architecto deleniti dignissimos dolor quam quasi sed!</p>
                        </div>
                        <div className="card"><img src="src/assets/images/5.jpg" alt="Alt"/>
                            <h3>Labore tempora, totam.</h3>
                            <p>Dolorem eum impedit natus, officia pariatur quo rerum sed sit?</p>
                        </div>
                        <div className="card"><img src="src/assets/images/6.jpg" alt="Alt"/>
                            <h3>Molestias obcaecati, reiciendis!</h3>
                            <p>Aperiam architecto cupiditate possimus quae similique sunt tenetur. Ab, est?</p>
                        </div>
                        <div className="card"><img src="src/assets/images/7.jpg" alt="Alt"/>
                            <h3>Dolorum esse, natus!</h3>
                            <p>At beatae magnam odit perferendis quidem quisquam recusandae similique tempora.</p>
                        </div>
                        <div className="card"><img src="src/assets/images/8.jpg" alt="Alt"/>
                            <h3>Ad, corporis, quod.</h3>
                            <p>Blanditiis eos id qui reprehenderit temporibus tenetur vitae! Explicabo, praesentium.</p>
                        </div>

                    </header>

                    <div className="othercontent">
                        <p>©Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt в culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default App