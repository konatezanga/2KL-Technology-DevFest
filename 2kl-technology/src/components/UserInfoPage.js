// UserInfoPage.js
'use client';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Card } from './ui/Card';
import { Textarea } from './ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { User, ArrowRight } from 'lucide-react';

export function UserInfoPage({ onNavigate, formData, updateFormData }) {
  const [localData, setLocalData] = useState({
    age: formData?.age || '',
    gender: formData?.gender || '',
    medicalHistory: formData?.medicalHistory || '',
  });

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    
    // Vérification sécurisée de updateFormData
    if (updateFormData && typeof updateFormData === 'function') {
      updateFormData(newData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('symptoms');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vos informations</h1>
              <p className="text-sm text-gray-600">Pour un diagnostic plus précis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Age */}
            <div className="space-y-3">
              <Label htmlFor="age" className="text-base font-semibold text-gray-900">Âge *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Ex: 35"
                value={localData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                required
                min="0"
                max="120"
                className="h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
              />
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label htmlFor="gender" className="text-base font-semibold text-gray-900">Sexe *</Label>
              <Select 
                value={localData.gender}
                onValueChange={(value) => handleChange('gender', value)}
                required
              >
                <SelectTrigger className="h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base">
                  <SelectValue placeholder="Sélectionnez votre sexe" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-lg">
                  <SelectItem value="male" className="text-base py-3 hover:bg-blue-50 cursor-pointer">Homme</SelectItem>
                  <SelectItem value="female" className="text-base py-3 hover:bg-blue-50 cursor-pointer">Femme</SelectItem>
                  <SelectItem value="other" className="text-base py-3 hover:bg-blue-50 cursor-pointer">Autre</SelectItem>
                  <SelectItem value="prefer-not" className="text-base py-3 hover:bg-blue-50 cursor-pointer">Préfère ne pas répondre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Medical History */}
            <div className="space-y-3">
              <Label htmlFor="medical-history" className="text-base font-semibold text-gray-900">
                Antécédents médicaux <span className="text-gray-500 font-normal">(optionnel)</span>
              </Label>
              <Textarea
                id="medical-history"
                placeholder="Maladies chroniques, allergies, traitements en cours, opérations passées..."
                value={localData.medicalHistory}
                onChange={(e) => handleChange('medicalHistory', e.target.value)}
                className="min-h-32 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base resize-none"
              />
              <p className="text-sm text-gray-500">
                Ces informations nous aident à affiner le diagnostic
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800 flex items-center gap-2">
                <span className="text-base">🔒</span>
                Vos données sont sécurisées et utilisées uniquement pour améliorer la précision du diagnostic.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
              >
                Continuer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full shadow-sm"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-3 font-medium">Étape 1 sur 3</p>
        </div>
      </div>
    </div>
  );
}