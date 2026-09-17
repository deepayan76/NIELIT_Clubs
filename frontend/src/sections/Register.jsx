import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { clubs } from '../data/clubs';
import Toast from '../components/Toast';
import logoImg from '../assets/logo.png';
import checklistImg from '../assets/registration/checklist.png';
import Interactive3DScene from '../components/ThreeCanvas/Interactive3DScene';
import { apiFetch } from '../services/api';
import '../styles/Register.css';

export default function Register() {
  const getInitialClub = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const clubParam = params.get('club');
      if (clubParam) {
        const lower = clubParam.toLowerCase();
        const found = clubs.find((c) => c.id === lower || c.shortName.toLowerCase() === lower);
        if (found) return found.id;
      }
    }
    return '';
  };

  const [formData, setFormData] = useState({
    club: getInitialClub(),
    name: '',
    email: '',
    rollNumber: '',
    semester: '',
    reason: ''
  });

  // Re-check if URL changes
  useEffect(() => {
    const handleUrlCheck = () => {
      const initial = getInitialClub();
      if (initial) {
        setFormData((prev) => ({ ...prev, club: initial }));
      }
    };
    handleUrlCheck();
    window.addEventListener('popstate', handleUrlCheck);
    return () => window.removeEventListener('popstate', handleUrlCheck);
  }, []);

  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.club) newErrors.club = 'Please select a club.';
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll Number is required.';
    if (!formData.semester.trim()) newErrors.semester = 'Semester is required.';
    if (!formData.reason.trim()) newErrors.reason = 'Please provide your reason for joining.';
    return newErrors;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const selectedClubObj = clubs.find((c) => c.id === formData.club);
    const clubShortName = selectedClubObj ? selectedClubObj.shortName : formData.club;

    try {
      const data = await apiFetch('/api/registrations', {
        method: 'POST',
        body: {
          name: formData.name.trim(),
          rollNumber: formData.rollNumber.trim(),
          email: formData.email.trim(),
          semester: parseInt(formData.semester, 10),
          club: clubShortName,
          reason: formData.reason.trim()
        }
      });

      setToastMessage(
        `Registration submitted successfully for ${selectedClubObj?.name || 'NIELIT Club'}! Your application is now under review by NIELIT Tech Clubs administration.`
      );
      setIsToastVisible(true);

      // Reset form
      setFormData({
        club: '',
        name: '',
        email: '',
        rollNumber: '',
        semester: '',
        reason: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Registration submission error:', err);
      if (err.status === 409) {
        setToastMessage(err.message || 'You have already submitted a registration for this club.');
      } else if (err.status === 400) {
        if (err.data?.errors && typeof err.data.errors === 'object') {
          setErrors(err.data.errors);
        }
        setToastMessage(err.message || 'Please check your registration fields and try again.');
      } else {
        setToastMessage(err.message || 'Unable to submit registration right now. Please try again later.');
      }
      setIsToastVisible(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsToastVisible(false);
      }, 7000);
    }
  };


  return (
    <section className="register-section container" id="register">
      <div className="register-grid">
        {/* Left Side: Blue Registration Form Panel */}
        <div className="register-panel">
          <h2 className="register-panel-title">Register</h2>

          <form className="register-form" onSubmit={handleSubmit} noValidate>
            {/* Club Selection */}
            <div className="form-group">
              <label className="form-label club-question-label">
                Which club are you interested in?
              </label>

              <div
                className="club-selector-grid"
                role="radiogroup"
                aria-label="Select a club"
              >
                {clubs.map((c) => {
                  const isSelected = formData.club === c.id;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      role="radio"
                      aria-checked={isSelected}
                      className={`club-selector-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleChange('club', c.id)}
                    >
                      <span className="selector-radio-dot" />
                      <div className="selector-icon-wrap">
                        <img src={c.icon} alt="" className="selector-icon" />
                      </div>
                      <span className="selector-name">{c.shortName}</span>
                    </button>
                  );
                })}
              </div>
              {errors.club && <p className="form-error-msg">{errors.club}</p>}
            </div>

            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="reg-name" className="form-label">
                Name
              </label>
              <input
                id="reg-name"
                type="text"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="write your name...."
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                aria-required="true"
              />
              {errors.name && <p className="form-error-msg">{errors.name}</p>}
            </div>

            {/* Email Input (Under Name Box) */}
            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">
                Email
              </label>
              <input
                id="reg-email"
                type="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="write your email...."
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                aria-required="true"
              />
              {errors.email && <p className="form-error-msg">{errors.email}</p>}
            </div>

            {/* Roll Number Input */}
            <div className="form-group">
              <label htmlFor="reg-roll" className="form-label">
                Roll Number
              </label>
              <input
                id="reg-roll"
                type="text"
                className={`form-input ${errors.rollNumber ? 'input-error' : ''}`}
                placeholder="1234......"
                value={formData.rollNumber}
                onChange={(e) => handleChange('rollNumber', e.target.value)}
                aria-required="true"
              />
              {errors.rollNumber && <p className="form-error-msg">{errors.rollNumber}</p>}
            </div>

            {/* Semester Input */}
            <div className="form-group">
              <label htmlFor="reg-semester" className="form-label">
                Semester
              </label>
              <input
                id="reg-semester"
                type="text"
                className={`form-input ${errors.semester ? 'input-error' : ''}`}
                placeholder="what is your semester?...."
                value={formData.semester}
                onChange={(e) => handleChange('semester', e.target.value)}
                aria-required="true"
              />
              {errors.semester && <p className="form-error-msg">{errors.semester}</p>}
            </div>

            {/* Why do you want to join? Textarea */}
            <div className="form-group">
              <label htmlFor="reg-reason" className="form-label">
                Why do you want to join ?
              </label>
              <textarea
                id="reg-reason"
                className={`form-textarea ${errors.reason ? 'input-error' : ''}`}
                placeholder="express..."
                rows="3"
                value={formData.reason}
                onChange={(e) => handleChange('reason', e.target.value)}
                aria-required="true"
              />
              {errors.reason && <p className="form-error-msg">{errors.reason}</p>}
            </div>

            {/* Submit Action Area */}
            <div className="register-submit-row">
              <button
                type="submit"
                className="register-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>

              <div className="register-info-note">
                <Info size={16} className="info-icon" />
                <span>After clicking submit check your email for logging in</span>
              </div>
            </div>
          </form>
        </div>

        {/* Right Side: NIELIT Logo & Checklist Illustration */}
        <div className="register-side-graphics">
          <div className="register-side-top">
            <img
              src={logoImg}
              alt="NIELIT Logo"
              className="register-top-logo"
            />
          </div>

          <div className="register-side-bottom">
            <Interactive3DScene
              src={checklistImg}
              modelPath="/models/registration/registration.glb"
              alt="Students with registration checklist in 3D"
              className="register-checklist-img"
              maxRotX={0.07}
              maxRotY={0.09}
              maxTrans={0.08}
              scaleOnHover={1.03}
              floating={true}
              interactive={true}
              seed={7.8}
            />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </section>
  );
}
