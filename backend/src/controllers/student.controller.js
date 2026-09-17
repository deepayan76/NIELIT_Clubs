import Registration from '../models/Registration.js';
import User from '../models/User.js';

/**
 * GET /api/student/profile
 * Returns authenticated student's profile (guarded by requireStudent)
 */
export async function getStudentProfile(req, res, next) {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash').lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student account not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        semester: user.semester,
        club: user.club,
        role: user.role,
        accountStatus: user.accountStatus,
        registrationId: user.registrationId,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    return next(error);
  }
}

/**
 * GET /api/student/application
 * Retrieves the authenticated student's own registration application record
 */
export async function getStudentApplication(req, res, next) {
  try {
    let registration = null;

    if (req.user.registrationId) {
      registration = await Registration.findById(req.user.registrationId).lean();
    }

    if (!registration) {
      registration = await Registration.findOne({
        email: req.user.email,
        rollNumber: req.user.rollNumber
      }).lean();
    }

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Application record not found for this student.'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        _id: registration._id,
        name: registration.name,
        rollNumber: registration.rollNumber,
        email: registration.email,
        semester: registration.semester,
        club: registration.club,
        reason: registration.reason,
        status: registration.status,
        submittedAt: registration.createdAt,
        updatedAt: registration.updatedAt,
        reviewedAt: registration.reviewedAt,
        reviewedBy: registration.reviewedBy
      }
    });
  } catch (error) {
    console.error('Error fetching student application:', error);
    return next(error);
  }
}

/**
 * GET /api/student/notifications
 * Returns contextual notifications for the authenticated student
 */
export async function getStudentNotifications(req, res, next) {
  try {
    const user = req.user;
    const notifications = [];

    if (user.accountStatus === 'ACTIVE') {
      notifications.push({
        id: `notif_app_${user._id}`,
        title: 'Application Approved',
        message: `Your membership application for the ${user.club} Club has been approved. Welcome to NIELIT Tech Clubs!`,
        time: 'Active',
        type: 'success',
        read: false,
        createdAt: user.createdAt || new Date().toISOString()
      });
    }

    return res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    console.error('Error fetching student notifications:', error);
    return next(error);
  }
}
