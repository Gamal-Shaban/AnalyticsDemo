import {THEME_SCHEME} from '@env';

export const initialStates = {
  appState: {
    isLoaded: false,
    theme: THEME_SCHEME,
  },
  user: {
    userData: null,
    loginLoading: false,
    signupLoading: false,
    logoutLoading: false,
    loginError: null,
    signupError: null,
    updatePasswordLoading: false,
    updatePasswordError: null,
    loginFirstTime: true,
  },
  deviceInfo: {
    deviceInfoSaved: false,
  },
  CDR: {
    loading: true,
  },
  cdrCallCenter: {
    loading: true,
    CDRDataCallCenter: [],
    queueNameData: [],
  },
  flagCalls: {
    loading: true,
    updateFlagId: null,
  },
  callsCredit: {
    loading: true,
    addAmountLoading: false,
  },
  bankTransfer: {
    loading: true,
    addBankTransferLoading: false,
  },
  balance: {
    loading: true,
    currentBalance: null,
  },
  vouchers: {
    loading: true,
    currentBalance: null,
    addVoucherLoading: false,
  },
  DID: {
    loading: true,
  },
  tenants: {
    loading: true,
  },
  wallet: {
    loading: true,
    createPaymentLoading: false,
  },
  cardsCredit: {
    createPaymentLoading: false,
  },
  services: {
    loading: true,
    servicesPackagesLoading: true,
    servicesMasterLoading: true,
    reportsLoading: true,
    servicesPackagesData: [],
    servicesMasterData: [],
    reportsData: [],
    reportDetailsData: null,
  },
};
