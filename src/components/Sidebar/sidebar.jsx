import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './styles.min.css';
import logo from '../../assets/images/pinn_background_white.png';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PreviewIcon from '@mui/icons-material/Preview';
import DevicesIcon from '@mui/icons-material/Devices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const Sidebar = ({ isExpanded = false, setIsExpanded }) => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formatUsername = (username) => {
    if (!username) return '';
    return username
      .split('.')
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(' ');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <img src={logo} alt={t('company_logo')} className="logo" />
        <button className="menu-btn" onClick={() => setIsExpanded(!isExpanded)}>
          ☰
        </button>
        {isExpanded && data && (
          <div className="data">
            {data.profile_picture ? (
              <img
                src={`http://localhost:8000/${data.profile_picture}`}
                alt="Profile"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            ) : (
              <AccountCircleIcon style={{ color: '', fontSize: '50px' }} />
            )}
            <span>{formatUsername(data.username)}</span>
          </div>
        )}
      </div>
      <nav>
        <ul>
          <li>
            <h3>{t('home')}</h3>
            <NavLink to="/home/dashboard" activeClassName="active">
              <SpaceDashboardIcon />
              {isExpanded && <span style={{ marginLeft: '8px' }}>{t('dashboard')}</span>}
            </NavLink>
          </li>
          <li>
            <h3>{t('asset_management')}</h3>
            <ul>
              <li>
                <NavLink to="/cadastro/ativos" activeClassName="active">
                  <DevicesIcon />
                  {isExpanded && <span style={{ marginLeft: '8px' }}>{t('register_asset')}</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/gerenciamento/ativos" activeClassName="active">
                  <PreviewIcon />
                  {isExpanded && <span style={{ marginLeft: '8px' }}>{t('view_asset')}</span>}
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <h3>{t('Barcodes')}</h3>
            <NavLink to="/generate-barcodes/pinnsystem" activeClassName="active">
              <QrCode2Icon />
              {isExpanded && <span style={{ marginLeft: '8px' }}>{t('codes')}</span>}
            </NavLink>
          </li>
          <li>
            <h3>{t('settings')}</h3>
            <ul>
              <li>
                <NavLink to="/controle/perfil" activeClassName="active">
                  <SettingsIcon />
                  {isExpanded && <span style={{ marginLeft: '8px' }}>{t('Controle')}</span>}
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="logout-section">
        <NavLink to="/auth/login" onClick={handleLogout} activeClassName="active">
          <ExitToAppIcon />
          {isExpanded && <span style={{ marginLeft: '8px' }}>{t('logout')}</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
