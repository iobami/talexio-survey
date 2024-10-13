const routes = {
  home: {
    path: '/'
  },

  auth: {
    path: '/auth',

    signIn: {
      path: '/auth/sign-in'
    },

    signOut: {
      path: '/auth/sign-out'
    },

    verification: {
      path: '/auth/verification'
    }
  },

  dashboard: {
    entry: {
      path: '/dashboard'
    },

    getStarted: {
      path: '/dashboard/get-started',

      professionalDetails: {
        path: '/dashboard/get-started/professional-details'
      },

      socialMediaDetails: {
        path: '/dashboard/get-started/social-media-details'
      },

      bio: {
        path: '/dashboard/get-started/bio'
      },

      selectPlan: {
        path: '/dashboard/get-started/select-plan'
      },

      teamSetup: {
        path: '/dashboard/get-started/team-setup'
      },

      done: {
        path: '/dashboard/get-started/done'
      }
    },

    invoiceAndPayment: {
      path: '/dashboard/invoice-and-payment'
    },

    projectManagement: {
      path: '/dashboard/project-management'
    }
  },

  survey: {
    path: '/survey',

    accountType: {
      path: '/survey/account-type'
    },

    emailVerification: {
      path: '/survey/email-verification'
    },

    personalDetails: {
      path: '/survey/personal-details'
    },

    security: {
      path: '/survey/security'
    },

    individual: {
      path: '/survey/individual',

      profession: {
        path: '/survey/individual/profession'
      }
    },

    team: {
      path: '/survey/team',

      companyDetails: {
        path: '/survey/team/company-details'
      },

      profession: {
        path: '/survey/team/profession'
      }
    }
  }
}

export default routes
