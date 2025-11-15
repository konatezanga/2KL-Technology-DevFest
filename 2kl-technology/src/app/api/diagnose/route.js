// src/app/api/diagnose/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('[API] Début de la requête vers FastAPI');

    const formData = await request.json();
    
    console.log('Données complètes reçues:', {
      symptoms: formData.symptoms,
      age: formData.age,
      gender: formData.gender,
      medicalHistory: formData.medicalHistory,
      vitalSigns: formData.vitalSigns
    });

    if (!formData.symptoms || formData.symptoms.length === 0) {
      return NextResponse.json({ error: 'Veuillez ajouter au moins un symptôme' }, { status: 400 });
    }

    // Appel à votre API FastAPI avec TOUTES les données
    const fastApiResponse = await callFastAPI(formData);
    
    console.log('Réponse FastAPI reçue:', fastApiResponse);

    // Formatage pour le frontend
    const diagnosisResult = {
      success: true,
      diagnosis_fr: {
        possibleConditions: fastApiResponse.top_diagnoses.map(diagnosis => ({
          name: diagnosis.translated_name,
          probability: diagnosis.confidence,
          original_name: diagnosis.disease
        })),
        probability: fastApiResponse.top_diagnoses[0]?.confidence || 50,
        analysis: fastApiResponse.analysis,
        urgencyLevel: fastApiResponse.urgency_level,
        recommendations: fastApiResponse.recommendations
      },
      model_used: 'Zabihin/Symptom_to_Diagnosis',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(diagnosisResult);

  } catch (error) {
    console.error('Erreur API diagnose:', error);
    return NextResponse.json(
      { 
        error: 'Service médical temporairement indisponible',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Fonction pour appeler votre API FastAPI avec toutes les données
async function callFastAPI(patientData) {
  const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';
  
  console.log('Appel à FastAPI avec données complètes:', patientData);

  const response = await fetch(`${FASTAPI_URL}/diagnose`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symptoms: patientData.symptoms,
      age: patientData.age,
      gender: patientData.gender,
      medicalHistory: patientData.medicalHistory,
      vitalSigns: patientData.vitalSigns || {}
    }),
    timeout: 30000
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FastAPI error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  console.log('Réponse FastAPI traitée:', result);
  return result;
}