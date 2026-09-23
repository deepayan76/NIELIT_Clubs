import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { clubs } from '../data/clubs';
import Toast from '../components/Toast';
import { apiFetch } from '../services/api';
import { EyeTracking } from '@/components/ui/eye-tracking';
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

  // Dynamic responsive eye size & gap for two realistic eyes
  const [eyeSize, setEyeSize] = useState(120);
  const [eyeGap, setEyeGap] = useState(28);

  useEffect(() => {
    const updateSize = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setEyeSize(85);
        setEyeGap(14);
      } else if (window.innerWidth < 1024) {
        setEyeSize(105);
        setEyeGap(18);
      } else {
        setEyeSize(125);
        setEyeGap(22);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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

    // 1. Club: Required
    if (!formData.club) {
      newErrors.club = 'Please select a club.';
    }

    // 2. Name: Required, max 100 chars
    const name = formData.name.trim();
    if (!name) {
      newErrors.name = 'Name is required.';
    } else if (name.length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters.';
    }

    // 3. Email: Required, valid email format, max 100 chars
    const email = formData.email.trim();
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (email.length > 100) {
      newErrors.email = 'Email cannot exceed 100 characters.';
    }

    // 4. Roll Number: Required, max 50 chars
    const rollNumber = formData.rollNumber.trim();
    if (!rollNumber) {
      newErrors.rollNumber = 'Roll Number is required.';
    } else if (rollNumber.length > 50) {
      newErrors.rollNumber = 'Roll Number cannot exceed 50 characters.';
    }

    // 5. Semester: Required, integer between 1 and 6
    const semester = formData.semester.trim();
    if (!semester) {
      newErrors.semester = 'Semester is required.';
    } else if (!/^[1-6]$/.test(semester)) {
      newErrors.semester = 'Semester must be an integer between 1 and 6.';
    }

    // 6. Reason: Required, min 10 chars, max 1000 chars
    const reason = formData.reason.trim();
    if (!reason) {
      newErrors.reason = 'Please provide your reason for joining.';
    } else if (reason.length < 10) {
      newErrors.reason = 'Reason must be at least 10 characters long.';
    } else if (reason.length > 1000) {
      newErrors.reason = 'Reason cannot exceed 1000 characters.';
    }

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
        `Registration submitted successfully for ${selectedClubObj?.name || 'NEXORA Club'}! Your application is now under review by NEXORA Tech Clubs administration.`
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
      <div className="register-container-wrapper">
        <div className="register-layout-grid">
          {/* Left Side: White Registration Form Panel */}
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

              {/* Email Input */}
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

          {/* Right Side: Componentry Two Eyes Tracking Companion */}
          <div className="register-eye-wrapper" aria-hidden="true">
            <div className="register-eye-container">
              <EyeTracking
                eyeSize={eyeSize}
                gap={eyeGap}
                variant="realistic"
                irisColor="#6B3514"
                irisColorSecondary="#B06C38"
                pupilColor="#080808"
                scleraColor="#FAF6F0"
                pupilRange={0.65}
                eyeCount={2}
                showReflection={true}
                showIrisDetail={true}
                reactivePupil={true}
                blinkInterval={3800}
                idleAnimation={true}
              />
            </div>
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
