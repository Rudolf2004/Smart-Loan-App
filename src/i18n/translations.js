const rows = {
  "Loan Application": ["Bosea Akwammisa", "Demande de prêt", "Neman Rance", "Akɛɛ Shika", "Feɖeɖe Biabia"],
  "Secure & Safe": ["Ahobammɔ mu", "Sûr et sécurisé", "Amintacce", "Hewalɛ kɛ Shwɛlɛ", "Le dedieƒe me"],
  "Personal Info": ["Ankorankoro Nsɛm", "Informations personnelles", "Bayanan Kai", "Gbɔmɔtso Nsɛm", "Amesi ŋutɔ ƒe Nyatakakawo"],
  "Employment": ["Adwuma", "Emploi", "Aiki", "Biɛ", "Dɔwɔwɔ"],
  "Financial": ["Sikasɛm", "Finances", "Kuɗi", "Shika Nsɛm", "Gãnyawo"],
  "Loan Details": ["Bosea Ho Nsɛm", "Détails du prêt", "Bayanan Rance", "Shika Akɛɛ Nsɛm", "Feɖeɖe Ŋuti Nyatakakawo"],
  "Collateral": ["Bogyapade", "Garantie", "Jingina", "Nibii", "Nudɔanyi"],
  "Guarantor": ["Okunini", "Garant", "Mai Lamuni", "Kafɔmɔ", "Kafukafu"],
  "Review": ["Hwɛ Mu", "Vérification", "Bita", "Shwɛ Mli", "Dzro Agbagba"],
  "Personal Information": ["Ankorankoro Ho Nsɛm", "Informations personnelles", "Bayanan Kai", "Gbɔmɔtso Ho Nsɛm", "Amesi Ŋutɔ ƒe Nyatakakawo"],
  "Employment Information": ["Adwuma Ho Nsɛm", "Informations professionnelles", "Bayanan Aiki", "Biɛ Ho Nsɛm", "Dɔwɔwɔ Ŋuti Nyatakakawo"],
  "Financial Information": ["Sikasɛm Ho Nsɛm", "Informations financières", "Bayanan Kuɗi", "Shika Ho Nsɛm", "Gãnyawo Ŋuti Nyatakakawo"],
  "Age": ["Mfe", "Âge", "Shekaru", "Afii", "Ƒe"],
  "Annual Income": ["Afe Biara Sika", "Revenu annuel", "Kuɗin Shiga na Shekara", "Afe Shika", "Ƒe Me Gã"],
  "Credit Score": ["Credit Nkontaabu", "Score de crédit", "Makin Kiredit", "Credit Akontaabu", "Krediti Ƒe Nɔmba"],
  "Employment Status": ["Adwuma Gyinabea", "Situation professionnelle", "Matsayin Aiki", "Biɛ Gyinabea", "Dɔwɔwɔ Ƒe Nɔnɔme"],
  "Years Employed": ["Mfe a Woayɛ Adwuma", "Années d’emploi", "Shekarun Aiki", "Biɛ Afii", "Dɔwɔwɔ Ƒe Ƒewo"],
  "Existing Debt": ["Ɛka a Ɛwɔ Hɔ", "Dette existante", "Bashin da Ake Bi", "Ka Niŋ", "Fe Si Li"],
  "Loan Amount": ["Bosea Sika", "Montant du prêt", "Adadin Rance", "Shika Akɛɛ", "Feɖeɖe Ƒe Gã"],
  "Loan Purpose": ["Bosea Botae", "Objet du prêt", "Dalilin Rance", "Akɛɛ Botae", "Feɖeɖe Ƒe Taɖodzinu"],
  "Collateral Value": ["Bogyapade Boɔ", "Valeur de la garantie", "Darajar Jingina", "Nibii Bo", "Nudɔanyi Ƒe Asixɔxɔ"],
  "Save & Exit": ["Sie na Fi Mu", "Enregistrer et quitter", "Ajiye a Fita", "Kɛ Shi Kɛ Yaa", "Dzra Eye Nàdo Go"],
  "Apply Now": ["Bisa Seesei", "Demander maintenant", "Nema Yanzu", "Biɔ Nɔɔ", "Bia Fifia"],
  "Next": ["Nea Edi Hɔ", "Suivant", "Na Gaba", "Nɔ Ko", "Eyome"],
  "Continue": ["Kɔ So", "Continuer", "Ci Gaba", "Yaa Nɔ", "Yi Edzi"],
  "Back": ["San Kɔ", "Retour", "Koma Baya", "Sane", "Trɔ Megbe"],
  "Home": ["Fie", "Accueil", "Gida", "Shikpon", "Aƒe"],
  "Loans": ["Bosea", "Prêts", "Rance", "Shika Akɛɛ", "Feɖeɖewo"],
  "Applications": ["Akwammisa", "Demandes", "Aikace-aikace", "Biabia", "Biabiawo"],
  "Notifications": ["Amanneɛbɔ", "Notifications", "Sanarwa", "Tsɛɛlɛ", "Nyatakakawo"],
  "Settings": ["Nhyehyɛe", "Paramètres", "Saituna", "Nɔɔmɔ", "Ɖoɖowo"],
  "Language": ["Kasa", "Langue", "Harshe", "Wiemo", "Gbegbɔgblɔ"],
  "App language": ["App Kasa", "Langue de l’application", "Harshen Manhaja", "App Wiemo", "Dɔwɔnu Ƒe Gbe"],
  "Large text": ["Nkyerɛwee Kɛse", "Grand texte", "Babban Rubutu", "Ŋmalɛ Kɛse", "Ŋɔŋlɔ Gã"],
  "High contrast": ["Nsonsonoe Kɛse", "Contraste élevé", "Babban Bambanci", "Shikpon Kɛse", "Vovototo Gã"],
  "Why we need this information": ["Nea Enti a Yɛhia Saa Nsɛm Yi", "Pourquoi ces informations sont nécessaires", "Dalilin da Muke Bukatar Wannan Bayani", "Meni Yɛ Hia Nsɛm Nɛɛ", "Nu Si Ta Míehiã Nyatakaka Sia"],
  "Please provide your basic personal details.": ["Yɛsrɛ wo, kyerɛw wo ho nsɛm titiriw.", "Veuillez fournir vos informations personnelles de base.", "Da fatan za a bayar da bayanan kai na asali.", "Ofainɛ, ha bo ŋutɔ nsɛm titiriw.", "Taflatse na wò ŋutɔ ƒe nyatakaka veviwo."],
  "Tell us about your employment.": ["Ka w’adwuma ho asɛm kyerɛ yɛn.", "Parlez-nous de votre emploi.", "Faɗa mana game da aikinka.", "Gblɔ bo biɛ hewalɛ yɛ.", "Gblɔ wò dɔwɔwɔ ŋu na mí."],
  "Choose your language": ["Paw Wo Kasa", "Choisissez votre langue", "Zaɓi Harshenka", "Sane Bo Wiemo", "Tia Wò Gbe"],
  "Loan guide": ["Bosea Boafo", "Guide de prêt", "Jagoran Rance", "Shika Akɛɛ Kpakpa", "Feɖeɖe Kplɔla"],
};

const indices = { Twi: 0, French: 1, Hausa: 2, Ga: 3, Ewe: 4 };

export function translateText(text, language) {
  if (language === "English") return text;
  const translated = rows[text.trim()]?.[indices[language]];
  if (!translated) return text;
  const leading = text.match(/^\s*/)?.[0] || "";
  const trailing = text.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
}
