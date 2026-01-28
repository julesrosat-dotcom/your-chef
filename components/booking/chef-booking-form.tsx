'use client';

import { useState } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface FormData {
  prestation: string;
  ville: string;
  dates: string;
  adultes: number;
  enfants: number;
  evenement: string;
  prix: string;
  heure: string;
  cuisines: string[];
  allergies: string[];
  commentaire: string;
  serveur: string;
  locationMateriel: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
}

interface ChefBookingFormProps {
  onClose: () => void;
}

export function ChefBookingForm({ onClose }: ChefBookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 11;
  const [formData, setFormData] = useState<FormData>({
    prestation: '',
    ville: '',
    dates: '',
    adultes: 1,
    enfants: 0,
    evenement: '',
    prix: '',
    heure: '',
    cuisines: [],
    allergies: [],
    commentaire: '',
    serveur: 'Non',
    locationMateriel: 'Non',
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
  });

  const progressPercent = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const formElement = document.createElement('form');
    formElement.action = 'https://hook.eu2.make.com/l44muapf8io1m1i07ln2ibqvju75ylln';
    formElement.method = 'POST';
    formElement.target = '_blank';

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = Array.isArray(value) ? value.join(', ') : String(value);
      formElement.appendChild(input);
    });

    document.body.appendChild(formElement);
    formElement.submit();
    document.body.removeChild(formElement);

    setTimeout(() => {
      window.location.href = '/confirmation-demande-devis';
    }, 500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 6:
        return <Step6 formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 7:
        return <Step7 formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 8:
        return <Step8 formData={formData} setFormData={setFormData} />;
      case 9:
        return <Step9 formData={formData} setFormData={setFormData} />;
      case 10:
        return <Step10 formData={formData} setFormData={setFormData} />;
      case 11:
        return <Step11 formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between h-20 px-8">
          <div className="text-2xl font-bold text-orange-500">
            <span className="text-orange-500">GET</span>
            <span className="text-gray-400">CHEF</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 pb-48">
        {renderStep()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-10">
        <div className="hidden md:flex items-center justify-center gap-4 text-sm text-gray-600 py-3 border-b bg-gray-50">
          <span>⏱️ Annulation gratuite de 7 jours</span>
          <span>✅ Couverture d'assurance</span>
          <span>🇫🇷 La plateforme n°1 française de chef privé</span>
          <span>✔️ Disponible dans toute la france</span>
        </div>
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          {currentStep > 1 ? (
            <Button
              onClick={handlePrev}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              RETOUR
            </Button>
          ) : (
            <div />
          )}
          <Button
            onClick={handleNext}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
          >
            {currentStep === totalSteps ? 'ENVOYER' : currentStep === 8 || currentStep === 9 ? 'SAUTER' : 'SUIVANT'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Step1({ formData, setFormData, onNext }: any) {
  const options = [
    'Chef à domicile',
    'Chef à demeure',
    'Traiteur',
    'Cours de cuisine',
  ];

  const handleSelect = (value: string) => {
    setFormData({ ...formData, prestation: value });
    setTimeout(onNext, 100);
  };

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Quel type de prestation souhaitez-vous ?</h2>
        <p className="text-gray-600">
          Sélectionnez le type de service qui correspond le mieux à votre besoin :
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className="w-80 px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-center"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ formData, setFormData }: any) {
  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Où se déroulera votre prestation ?</h2>
        <p className="text-gray-600">
          Entrez la ville ou l'adresse (Disponible partout en France)
        </p>
      </div>
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Paris..."
          value={formData.ville}
          onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-center"
        />
      </div>
    </div>
  );
}

function Step3({ formData, setFormData }: any) {
  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Quand ?</h2>
        <p className="text-gray-600">
          Sélectionnez la ou les dates pour lesquelles vous avez besoin d'un chef
        </p>
      </div>
      <div className="max-w-md mx-auto">
        <input
          type="date"
          value={formData.dates}
          onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-center"
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
}

function Step4({ formData, setFormData }: any) {
  if (formData.prestation === 'Traiteur') {
    return (
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Pour combien ?</h2>
          <p className="text-gray-600">
            Sélectionnez le nombre de personnes
          </p>
        </div>
        <div className="max-w-md mx-auto space-y-4">
          <label className="block text-gray-700 font-medium">
            Nombre total de personnes :
          </label>
          <input
            type="number"
            min="1"
            max="999"
            value={formData.adultes}
            onChange={(e) => setFormData({ ...formData, adultes: parseInt(e.target.value) || 1 })}
            className="w-32 mx-auto block px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-center"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Pour combien ?</h2>
        <p className="text-gray-600">
          Sélectionnez le nombre de personnes
        </p>
      </div>
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-center gap-4">
          <span className="w-24 text-right font-medium">Adultes</span>
          <button
            onClick={() => setFormData({ ...formData, adultes: Math.max(1, formData.adultes - 1) })}
            className="w-11 h-11 rounded-full border-2 border-gray-400 hover:bg-gray-100 flex items-center justify-center text-xl font-bold"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold text-xl">{formData.adultes}</span>
          <button
            onClick={() => setFormData({ ...formData, adultes: formData.adultes + 1 })}
            className="w-11 h-11 rounded-full border-2 border-gray-400 hover:bg-gray-100 flex items-center justify-center text-xl font-bold"
          >
            +
          </button>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="w-24 text-right font-medium">Enfants</span>
          <button
            onClick={() => setFormData({ ...formData, enfants: Math.max(0, formData.enfants - 1) })}
            className="w-11 h-11 rounded-full border-2 border-gray-400 hover:bg-gray-100 flex items-center justify-center text-xl font-bold"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold text-xl">{formData.enfants}</span>
          <button
            onClick={() => setFormData({ ...formData, enfants: formData.enfants + 1 })}
            className="w-11 h-11 rounded-full border-2 border-gray-400 hover:bg-gray-100 flex items-center justify-center text-xl font-bold"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function Step5({ formData, setFormData, onNext }: any) {
  const events = [
    { value: 'Anniversaire', label: 'Anniversaire', icon: '🎂' },
    { value: 'Réunion de famille', label: 'Réunion de Famille', icon: '👨‍👩‍👧‍👦' },
    { value: 'Événement d\'entreprise', label: 'Événement d\'entreprise', icon: '💼' },
    { value: 'Evjf', label: 'EVJF / EVG', icon: '🎉' },
    { value: 'Amis', label: 'Rassemblement d\'amis', icon: '🎊' },
    { value: 'fiancailles', label: 'Fiançailles', icon: '💍' },
    { value: 'Aventure gastronomique', label: 'Aventure gastronomique', icon: '🌍' },
    { value: 'Se reunir', label: 'Se réunir', icon: '🤝' },
    { value: 'Location plusieurs jours', label: 'Expérience', icon: '👨‍🍳' },
    { value: 'Temps plein', label: 'Chef à temps plein', icon: '⏰' },
    { value: 'Mariage', label: 'Mariage', icon: '💒' },
    { value: 'Éxperience', label: 'Autre', icon: '⭐' },
  ];

  const handleSelect = (value: string) => {
    setFormData({ ...formData, evenement: value });
    setTimeout(onNext, 100);
  };

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Quel type d'événement prévoyez-vous ?</h2>
        <p className="text-gray-600">Sélection unique</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {events.map((event) => (
          <button
            key={event.value}
            onClick={() => handleSelect(event.value)}
            className="px-4 py-6 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all flex flex-col items-center gap-2 min-h-[100px]"
          >
            <span className="text-2xl">{event.icon}</span>
            <span className="text-sm font-medium text-center">{event.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step6({ formData, setFormData, onNext }: any) {
  if (formData.prestation === 'Traiteur') {
    return (
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Quel est le budget de votre événement ?</h2>
          <p className="text-gray-600">Veuillez saisir votre budget</p>
        </div>
        <div className="max-w-md mx-auto">
          <input
            type="number"
            min="350"
            placeholder="Votre budget en €"
            value={formData.prix.replace('€', '')}
            onChange={(e) => setFormData({ ...formData, prix: e.target.value + '€' })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-center"
          />
        </div>
      </div>
    );
  }

  if (formData.prestation === 'Chef à demeure') {
    const options = [
      'Complet',
      'Déjeuner et diner',
      'Déjeuner ou diner',
    ];

    const handleSelect = (value: string) => {
      setFormData({ ...formData, prix: value });
      setTimeout(onNext, 100);
    };

    return (
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Quel forfait pour le chef ?</h2>
          <p className="text-gray-600">Le forfait restera flexible selon vos besoins/obligations</p>
        </div>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
            >
              {option === 'Complet' ? 'Petit-déjeuner / Déjeuner / Dîner' : option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const priceRanges = [
    { value: '50-70', title: 'Expérience Découverte', subtitle: '50€ - 70€ /pers' },
    { value: '70-150', title: 'Expérience Gastronomique', subtitle: '70€ - 150€ /pers' },
    { value: '+170', title: 'Expérience Étoilé', subtitle: '+170€ /pers' },
  ];

  const handleSelect = (value: string) => {
    setFormData({ ...formData, prix: value });
    setTimeout(onNext, 100);
  };

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Quelle gamme de prix ?</h2>
        <p className="text-gray-600">Les tarifs s'adaptent à votre nombre de convives. Commande minimale : 325 €</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
        {priceRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => handleSelect(range.value)}
            className="w-64 px-6 py-8 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:shadow-lg transition-all"
          >
            <h4 className="font-semibold text-lg mb-2">{range.title}</h4>
            <p className="text-sm text-gray-600">{range.subtitle}</p>
          </button>
        ))}
      </div>
      <div className="max-w-2xl mx-auto">
        <p className="bg-orange-50 border border-orange-200 text-orange-900 px-4 py-3 rounded-lg text-sm">
          Une prestation GetChef comprend l'achat des ingrédients, le service ainsi que le rangement de votre espace par le chef 😉
        </p>
      </div>
    </div>
  );
}

function Step7({ formData, setFormData, onNext }: any) {
  if (formData.prestation === 'Chef à demeure') {
    const options = [
      { value: 'chef logé', label: 'OUI' },
      { value: 'chef pas logé', label: 'NON' },
    ];

    const handleSelect = (value: string) => {
      setFormData({ ...formData, heure: value });
      setTimeout(onNext, 100);
    };

    return (
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Le chef peut-il être logé ?</h2>
          <p className="text-gray-600">Veuillez indiquer si un hébergement est nécessaire</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-32 px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const options = ['Déjeuner', 'Diner'];

  const handleSelect = (value: string) => {
    setFormData({ ...formData, heure: value });
    setTimeout(onNext, 100);
  };

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">À quelle heure ?</h2>
        <p className="text-gray-600">L'heure de la prestation sera confirmée de votre part</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className="w-40 px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step8({ formData, setFormData }: any) {
  const cuisines = [
    'Libre/Inspiration du Chef',
    'Française',
    'Gastronomique',
    'Asiatique',
    'Mediterraneenne',
    'Italienne',
    'Fusion',
    'Locale',
    'Autre',
  ];

  const toggleCuisine = (cuisine: string) => {
    const newCuisines = formData.cuisines.includes(cuisine)
      ? formData.cuisines.filter((c: string) => c !== cuisine)
      : [...formData.cuisines, cuisine];
    setFormData({ ...formData, cuisines: newCuisines });
  };

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Quelles cuisines préférez-vous ?</h2>
        <p className="text-gray-600">Sélection multiple possible</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => toggleCuisine(cuisine)}
            className={`px-6 py-3 border-2 rounded-lg transition-all ${
              formData.cuisines.includes(cuisine)
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step9({ formData, setFormData }: any) {
  const allergies = [
    'Aucun',
    'Végétarien',
    'Végétalien',
    'Gluten',
    'Lactose',
    'Fruit à coque',
    'Sans crustacés',
    'Casher',
    'Halal',
    'Autre',
  ];

  const toggleAllergy = (allergy: string) => {
    const newAllergies = formData.allergies.includes(allergy)
      ? formData.allergies.filter((a: string) => a !== allergy)
      : [...formData.allergies, allergy];
    setFormData({ ...formData, allergies: newAllergies });
  };

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Avez-vous des restrictions ou allergies ?</h2>
        <p className="text-gray-600">Sélection multiple si nécessaire</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {allergies.map((allergy) => (
          <button
            key={allergy}
            onClick={() => toggleAllergy(allergy)}
            className={`px-6 py-3 border-2 rounded-lg transition-all ${
              formData.allergies.includes(allergy)
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {allergy}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step10({ formData, setFormData }: any) {
  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Détails finaux</h2>
        <p className="text-gray-600">Ambiance de votre événement, demandes particulières, etc...</p>
      </div>
      <div className="max-w-md mx-auto space-y-6">
        <textarea
          placeholder="Vos remarques (facultatif)"
          value={formData.commentaire}
          onChange={(e) => setFormData({ ...formData, commentaire: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none min-h-[120px]"
        />
        <div className="text-left space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Serveur (option)</label>
            <select
              value={formData.serveur}
              onChange={(e) => setFormData({ ...formData, serveur: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="Non">NON</option>
              <option value="Oui">OUI</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location de matériel (option)</label>
            <select
              value={formData.locationMateriel}
              onChange={(e) => setFormData({ ...formData, locationMateriel: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="Non">NON</option>
              <option value="Oui">OUI</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step11({ formData, setFormData }: any) {
  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Mes coordonnées</h2>
        <p className="text-gray-600">Veuillez renseigner vos coordonnées</p>
      </div>
      <div className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Votre prénom *"
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Votre nom *"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Votre email *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          required
        />
        <input
          type="tel"
          placeholder="Votre numéro de téléphone *"
          value={formData.telephone}
          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          required
        />
      </div>
    </div>
  );
}
