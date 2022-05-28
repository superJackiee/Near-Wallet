import React from 'react';
import { Translate } from 'react-localize-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { CREATE_USN_CONTRACT, USN_BUTTON, DONATE_TO_UKRAINE } from '../../../../../features';
import { IS_MAINNET } from '../../config';
import USN_LOGO from '../../images/USN-logo.png';
import { Mixpanel } from '../../mixpanel/index';
import DonateToUkraineIcon from '../svg/DonateToUkraineIcon';
import HelpIcon from '../svg/HelpIcon';
import SwapIconTwoArrows from '../svg/SwapIconTwoArrows';
import UserIcon from '../svg/UserIcon';
import VaultIcon from '../svg/VaultIcon';
import WalletIcon from '../svg/WalletIcon';

const Container = styled.div`
    display: flex;
    width: 100%;
    a {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 100ms;
        color: #72727A;
        font-size: 15px;
        white-space: nowrap;

        :hover, &.selected {
            text-decoration: none;
            color: #272729;

            svg {
                path, circle, line {
                    stroke: #0072CE;
                }

                &.user-icon {
                    path {
                        stroke: #0072CE;
                        fill: #0072CE;

                        :last-of-type {
                            fill: none;
                        }
                    }
                }
            }
        }
    }


    svg {
        margin-right: 10px;
        width: 23px;
        height: 23px;

        &.user-icon {
            width: 35px;
            height: 35px;
            margin-right: 4px;
            stroke-width: 0px;
        }
    }

    .usn-button {
        margin-left: auto;
        margin-right: 20px;
        height: 35px;
        padding: 5px 15px 5px 5px;
        border-radius: 20px;
        background: #D6EDFF;
        font-weight: 600;
        color: black;
        white-space: nowrap;

        :hover {
            background: #0072CE;
            color: white;
        }

        img {
            margin-right: 10px;
            margin-top: 2px;
            width: 25px;
            height: 25px;
        }
    }

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: flex-start;
    }

    @media (min-width: 992px) {
        align-items: center;
        margin-left: 10px;

        a {
            margin-left: 25px;

            &.account-details-link {
                margin-left: 20px;
            }
        }
    }
`;

const NavLinks = () => (
    <Container className='nav-links'>
        <NavLink exact to='/' activeClassName='selected' onClick={() => Mixpanel.track('Click Wallet button on nav')}>
            <WalletIcon/>
            <Translate id='link.wallet'/>
        </NavLink>
        <NavLink data-test-id="staking_navlink" to='/staking' activeClassName='selected' onClick={() => Mixpanel.track('Click Staking button on nav')}>
            <VaultIcon/>
            <Translate id='link.staking'/>
        </NavLink>
        <NavLink to='/profile' className='account-details-link' activeClassName='selected' onClick={() => Mixpanel.track('Click Account button on nav')}>
            <UserIcon/>
            <Translate id='link.account'/>
        </NavLink>
        <a href='https://nearhelp.zendesk.com/' target='_blank' rel='noopener noreferrer' onClick={() => Mixpanel.track('Click Help button on nav')}>
            <HelpIcon/>
            <Translate id='link.help'/>
        </a>
        {CREATE_USN_CONTRACT && 
        <NavLink
            to="/swap-usn"
            activeClassName="selected"
            onClick={() => Mixpanel.track('Click Swap button on nav')}
        >
            <div>
                <SwapIconTwoArrows
                    width={'20'}
                    height="16"
                    color="#A2A2A8"
                    margin="10px"
                />
            </div>

            <Translate id="button.swapUSN" />
        </NavLink>}
        {DONATE_TO_UKRAINE && 
        <NavLink
             to={`/send-money/${IS_MAINNET ? 'ukraine' : 'ukraine.testnet'}`}
             activeClassName="selected"
             onClick={() => Mixpanel.track('Click Donate button on nav')}
        >
            <DonateToUkraineIcon />
            <Translate id="link.donateToUkraine" />
        </NavLink>}
        {USN_BUTTON && 
            <a
            href={!IS_MAINNET 
                ? 'https://swap.testnet.decentral-bank.finance/'
                : 'https://swap.decentral-bank.finance/'
            }
            target='_blank' 
            className="usn-button"
            onClick={() => Mixpanel.track('Click Buy USN')}
            rel="noreferrer"
            >
            <div>
                <img src={USN_LOGO} alt='open-link'></img>
            </div>
                <Translate id='link.buyUSN'/>
            </a>
     }
    </Container>
);

export default NavLinks;
