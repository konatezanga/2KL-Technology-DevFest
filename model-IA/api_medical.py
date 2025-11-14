# api_medical.py 
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer
import tensorflow as tf
import numpy as np
from typing import List, Dict
import logging

from deep_translator import GoogleTranslator

# Configuration logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Medical Diagnosis API")

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèles de données
class PatientData(BaseModel):
    symptoms: List[str]
    age: str = ""
    gender: str = ""
    medicalHistory: str = ""
    vitalSigns: Dict = {}

class DiagnosisResult(BaseModel):
    disease: str
    confidence: float
    translated_name: str = ""

class MedicalResponse(BaseModel):
    top_diagnoses: List[DiagnosisResult]
    urgency_level: str
    recommendations: List[Dict]
    analysis: str

# Chargement du modèle
try:
    logger.info("Chargement du modèle médical...")
    tokenizer = AutoTokenizer.from_pretrained("Zabihin/Symptom_to_Diagnosis")
    model = TFAutoModelForSequenceClassification.from_pretrained(
        "Zabihin/Symptom_to_Diagnosis", from_pt=False
    )
    logger.info("Modèle chargé avec succès")
except Exception as e:
    logger.error(f"Erreur chargement modèle: {e}")
    raise e

# Dictionnaire de traduction médicale étendu
MEDICAL_TRANSLATIONS = {
    'drug reaction': 'Réaction médicamenteuse',
    'diabetes': 'Diabète',
    'peptic ulcer disease': 'Ulcère gastroduodénal',
    'urinary tract infection': 'Infection urinaire',
    'fungal infection': 'Infection fongique',
    'arthritis': 'Arthrite',
    'common cold': 'Rhume',
    'varicose veins': 'Varices',
    'jaundice': 'Jaunisse',
    'psoriasis': 'Psoriasis',
    'pneumonia': 'Pneumonie',
    'gastroesophageal reflux disease': 'Reflux gastro-œsophagien',
    'hypertension': 'Hypertension',
    'chicken pox': 'Varicelle',
    'dengue': 'Dengue',
    'allergy': 'Allergie',
    'bronchial asthma': 'Asthme bronchique',
    'migraine': 'Migraine',
    'typhoid': 'Fièvre typhoïde',
    'impetigo': 'Impétigo',
    'cervical spondylosis': 'Spondylose cervicale',
    'malaria': 'Paludisme',
    'flu': 'Grippe',
    'sinusitis': 'Sinusite',
    'bronchitis': 'Bronchite',
    'gastroenteritis': 'Gastro-entérite',
    'strep throat': 'Angine streptococcique',
    'hepatitis': 'Hépatite',
    'anemia': 'Anémie',
    'tuberculosis': 'Tuberculose',
    'asthma': 'Asthme',
    'conjunctivitis': 'Conjonctivite',
    'eczema': 'Eczéma',
    'epilepsy': 'Épilepsie',
    'hypertension': 'Hypertension',
    'hypothyroidism': 'Hypothyroïdie',
    'obesity': 'Obésité',
    'osteoporosis': 'Ostéoporose',
    'rheumatoid arthritis': 'Polyarthrite rhumatoïde'
}

def translate_medical_term(term: str) -> str:
    """Traduit intelligemment un terme médical avec fallback"""
    
    # 1. Essayer le dictionnaire local
    term_lower = term.lower().strip()
    if term_lower in MEDICAL_TRANSLATIONS:
        return MEDICAL_TRANSLATIONS[term_lower]
    
    # 2. Essayer la traduction automatique
    try:
        translated = GoogleTranslator(source='en', target='fr').translate(term)
        logger.info(f"Traduction automatique: {term} → {translated}")
        return translated
    except Exception as e:
        logger.warning(f" Échec traduction automatique pour: {term}")
    
    # 3. Fallback intelligent
    return term + " (terme médical)"

def determine_urgency_level(symptoms: List[str], top_diagnosis: str, vital_signs: Dict) -> str:
    """Détermine l'urgence de façon intelligente et adaptable"""
    
    symptoms_text = ' '.join(symptoms).lower()
    diagnosis_lower = top_diagnosis.lower()
    
    # 1. CRITÈRES CRITIQUES ABSOLUS (indépendants du diagnostic)
    critical_symptoms = [
        'douleur thoracique', 'essoufflement', 'hémorragie', 'saignement abondant',
        'perte de conscience', 'paralysie', 'difficulté à respirer', 'étouffement',
        'douleur thoracique intense', 'oppression thoracique', 'convulsion',
        'brûlure grave', 'traumatisme crânien', 'douleur abdominale aiguë'
    ]
    
    # 2. CATÉGORIES de maladies critiques (plus flexible)
    critical_categories = {
        'cardio': ['infarction', 'heart', 'cardiac', 'myocardial', 'angina', 'tachycardia'],
        'respiratory': ['pneumonia', 'respiratory failure', 'asthma severe', 'copd exacerbation'],
        'neurological': ['stroke', 'meningitis', 'encephalitis', 'seizure', 'coma'],
        'infectious': ['sepsis', 'septic shock', 'meningococcemia', 'toxic shock'],
        'abdominal': ['appendicitis', 'peritonitis', 'intestinal obstruction', 'pancreatitis']
    }
    
    # 3. VÉRIFICATION DES SYMPTÔMES CRITIQUES
    if any(symptom in symptoms_text for symptom in critical_symptoms):
        return "critical"
    
    # 4. VÉRIFICATION INTELLIGENTE DES MALADIES CRITIQUES
    is_critical_disease = False
    for category, keywords in critical_categories.items():
        if any(keyword in diagnosis_lower for keyword in keywords):
            is_critical_disease = True
            break
    
    if is_critical_disease:
        return "critical"
    
    # 5. CRITÈRES MODÉRÉS + SIGNES VITAUX
    moderate_symptoms = [
        'fièvre élevée', 'forte fièvre', 'vomissements persistants', 'diarrhée sévère',
        'douleur abdominale sévère', 'douleur intense', 'vertiges sévères', 'vision floue',
        'confusion', 'désorientation', 'faiblesse généralisée', 'déshydratation'
    ]
    
    # Vérification des symptômes modérés
    moderate_count = sum(1 for symptom in moderate_symptoms if symptom in symptoms_text)
    if moderate_count >= 2:  # Au moins 2 symptômes modérés
        return "moderate"
    
    # 6. ANALYSE DES SIGNES VITAUX (logique améliorée)
    vital_signs_urgency = analyze_vital_signs_urgency(vital_signs)
    if vital_signs_urgency == "critical":
        return "critical"
    elif vital_signs_urgency == "moderate":
        return "moderate"
    
    # 7. URGENCE BASÉE SUR LA CONFIDENCE + SYMPTÔMES PERSISTANTS
    if any(keyword in symptoms_text for keyword in ['persistant', 'chronique', 'récurrent']):
        return "moderate"
    
    # 8. DÉFAUT - Cas bénin
    return "low"

def enhance_diagnosis_with_rules(symptoms: List[str], ai_predictions: List[Dict]) -> List[Dict]:
    """Améliore les diagnostics IA avec des règles médicales et scores variables"""
    
    symptoms_text = ' '.join(symptoms).lower()
    enhanced_predictions = []
    
    # Règles médicales par symptômes AVEC SCORES DIFFÉRENTS
    medical_rules = {
        # Respiratoire
        'toux': [('Bronchite', 0.75), ('Pneumonie', 0.70), ('COVID-19', 0.65), ('Asthme', 0.60)],
        'essoufflement': [('Asthme', 0.80), ('Pneumonie', 0.75), ('Insuffisance cardiaque', 0.70)],
        'nez qui coule': [('Rhume', 0.85), ('Allergie', 0.75), ('Sinusite', 0.65)],
        'éternuements': [('Allergie', 0.80), ('Rhume', 0.70)],
        
        # Cardiaque
        'douleur thoracique': [('Angine', 0.85), ('Infarctus', 0.80), ('Péricardite', 0.65)],
        'palpitations': [('Arythmie', 0.75), ('Anxiété', 0.70), ('Hyperthyroïdie', 0.60)],
        
        # Neurologique
        'maux de tête': [('Migraine', 0.80), ('Céphalée de tension', 0.70), ('Hypertension', 0.65)],
        'vertiges': [('Hypotension', 0.75), ('Vertige positionnel', 0.70), ('Anémie', 0.60)],
        'trouble de la parole': [('AVC', 0.90), ('Migraine avec aura', 0.60)],
        
        # Digestif
        'nausées': [('Gastro-entérite', 0.75), ('Migraine', 0.65), ('Grossesse', 0.60)],  # Retiré Grossesse
        'vomissements': [('Gastro-entérite', 0.80), ('Migraine', 0.65), ('Appendicite', 0.75)],
        'douleur abdominale': [('Gastro-entérite', 0.75), ('Appendicite', 0.80), ('Colique', 0.60)],
        'diarrhée': [('Gastro-entérite', 0.85), ('Intoxication alimentaire', 0.75)],
        
        # Cutané
        'démangeaisons': [('Eczéma', 0.80), ('Allergie', 0.75), ('Urticaire', 0.70)],
        'éruption cutanée': [('Allergie', 0.80), ('Varicelle', 0.75), ('Rougeole', 0.70)],
        
        # Général
        'fièvre': [('Infection virale', 0.75), ('COVID-19', 0.70), ('Infection bactérienne', 0.65)],
        'fatigue': [('Anémie', 0.70), ('Infection', 0.65), ('Dépression', 0.60)],
        'courbatures': [('Grippe', 0.75), ('COVID-19', 0.70), ('Infection virale', 0.65)]
    }
    
    # Appliquer les règles avec scores variables
    matched_diseases = []
    for symptom, diseases in medical_rules.items():
        if symptom in symptoms_text:
            for disease, score in diseases:
                matched_diseases.append({
                    "label": disease,
                    "score": score,  
                    "source": "medical_rules"
                })
    
    # Combiner IA + règles
    if matched_diseases:
        # Prendre les 3 meilleures règles
        matched_diseases.sort(key=lambda x: x["score"], reverse=True)
        enhanced_predictions.extend(matched_diseases[:3])
    
    # Ajouter les prédictions IA (avec score réduit)
    for pred in ai_predictions[:2]:
        if pred["label"] not in ['drug reaction', 'peptic ulcer disease']:
            enhanced_predictions.append({
                **pred,
                "score": pred["score"] * 0.3,  # Réduire davantage l'IA
                "source": "ai_model"
            })
    
    # Trier par score et retourner top 3
    enhanced_predictions.sort(key=lambda x: x["score"], reverse=True)
    return enhanced_predictions[:3]

def analyze_vital_signs_urgency(vital_signs: Dict) -> str:
    """Analyse intelligente des signes vitaux"""
    
    try:
        # Température
        temp = vital_signs.get('temperature', '')
        if temp:
            temp_val = float(temp)
            if temp_val > 39.5 or temp_val < 35.0:  # Hyperthermie sévère ou hypothermie
                return "critical"
            elif temp_val > 38.5:  # Fièvre importante
                return "moderate"
        
        # Fréquence cardiaque
        heart_rate = vital_signs.get('heartRate', '')
        if heart_rate:
            hr_val = int(heart_rate)
            if hr_val > 140 or hr_val < 40:  # Tachycardie/bradycardie sévère
                return "critical"
            elif hr_val > 120 or hr_val < 50:  # Rythme anormal
                return "moderate"
        
        # Tension artérielle (format "120/80")
        blood_pressure = vital_signs.get('bloodPressure', '')
        if blood_pressure and '/' in blood_pressure:
            try:
                systolic, diastolic = map(int, blood_pressure.split('/'))
                if systolic > 180 or diastolic > 120:  # Hypertension sévère
                    return "critical"
                elif systolic > 160 or diastolic > 100:  # Hypertension modérée
                    return "moderate"
                elif systolic < 90 or diastolic < 60:  # Hypotension
                    return "moderate"
            except ValueError:
                pass
                
    except (ValueError, TypeError) as e:
        logger.warning(f"Erreur analyse signes vitaux: {e}")
    
    return "low"

def generate_recommendations(urgency_level: str, top_diagnoses: List[DiagnosisResult]) -> List[Dict]:
    """Génère MAXIMUM 4 recommandations PERSONNALISÉES selon le diagnostic"""
    
    base_recommendations = []
    top_disease = top_diagnoses[0].translated_name.lower() if top_diagnoses else ""
    
    if urgency_level == "critical":
        base_recommendations = [
            {
                "icon": "Building2",
                "title": "URGENCE MÉDICALE IMMÉDIATE",
                "description": "Appelez le 185 (gratuit - SAMU) ou rendez-vous aux urgences SANS DÉLAI",
                "type": "emergency",
                "priority": 1
            },
            {
                "icon": "Stethoscope", 
                "title": "Surveillance continue",
                "description": "Ne pas rester seul·e - Surveiller conscience et respiration",
                "type": "monitoring",
                "priority": 2
            }
        ]
        
        # Recommandation spécifique selon le type de maladie
        if any(keyword in top_disease for keyword in ['cardiaque', 'cœur', 'infarctus']):
            base_recommendations.append({
                "icon": "Heart",
                "title": "Urgence cardiaque",
                "description": "Rester assis·e, ne pas faire d'effort, attendre les secours",
                "type": "cardiac_emergency",
                "priority": 3
            })
        elif any(keyword in top_disease for keyword in ['respiratoire', 'poumon', 'asthme']):
            base_recommendations.append({
                "icon": "Activity",
                "title": "Urgence respiratoire", 
                "description": "Rester en position assise, calme, libérer les voies respiratoires",
                "type": "respiratory_emergency",
                "priority": 3
            })
    
    elif urgency_level == "moderate":
        base_recommendations = [
            {
                "icon": "Stethoscope",
                "title": "Consultation médicale rapide",
                "description": "Prendre rendez-vous avec un médecin dans les 24-48h",
                "type": "doctor",
                "priority": 1
            },
            {
                "icon": "Pill",
                "title": "Gestion des symptômes", 
                "description": "Prendre les traitements habituels selon prescription",
                "type": "symptom_management",
                "priority": 2
            }
        ]
        
        # Personnalisation selon le diagnostic
        if any(keyword in top_disease for keyword in ['fièvre', 'infection']):
            base_recommendations.append({
                "icon": "Thermometer",
                "title": "Contrôle de la température",
                "description": "Surveiller la fièvre toutes les 4 heures",
                "type": "fever_management", 
                "priority": 3
            })
        elif any(keyword in top_disease for keyword in ['douleur', 'inflammation']):
            base_recommendations.append({
                "icon": "Activity",
                "title": "Gestion de la douleur",
                "description": "Repos et application de froid/chaud selon le type de douleur",
                "type": "pain_management",
                "priority": 3
            })
    
    else:  # low
        base_recommendations = [
            {
                "icon": "HomeIcon",
                "title": "Surveillance à domicile",
                "description": "Consulter si les symptômes persistent plus de 3 jours",
                "type": "home_monitoring",
                "priority": 1
            },
            {
                "icon": "Pill",
                "title": "Auto-soins",
                "description": "Repos, hydratation et alimentation équilibrée",
                "type": "self_care", 
                "priority": 2
            }
        ]
        
        # Personnalisation pour cas bénins
        if any(keyword in top_disease for keyword in ['rhume', 'grippe']):
            base_recommendations.append({
                "icon": "Thermometer", 
                "title": "Confort respiratoire",
                "description": "Humidificateur et boissons chaudes pour soulager",
                "type": "respiratory_comfort",
                "priority": 3
            })
    
    # Toujours ajouter une 4ème recommandation générale si besoin
    if len(base_recommendations) < 4:
        base_recommendations.append({
            "icon": "FileText",
            "title": "Suivi médical",
            "description": "Noter l'évolution des symptômes pour la consultation",
            "type": "medical_tracking",
            "priority": 4
        })
    
    # Retourner maximum 4 recommandations triées par priorité
    return sorted(base_recommendations, key=lambda x: x["priority"])[:4]

def generate_analysis(symptoms: List[str], top_diagnoses: List[DiagnosisResult], age: str, gender: str) -> str:
    """Génère une analyse médicale personnalisée"""
    
    top_disease = top_diagnoses[0] if top_diagnoses else None
    
    if not top_disease:
        return "Analyse médicale basée sur les symptômes décrits."
    
    analysis_parts = []
    
    # Introduction
    analysis_parts.append(f"Basé sur vos symptômes ({', '.join(symptoms)}), ")
    analysis_parts.append(f"la condition la plus probable est {top_disease.translated_name.lower()} ")
    analysis_parts.append(f"(confiance: {top_disease.confidence:.1f}%).")
    
    # Considérations démographiques
    if age:
        try:
            age_int = int(age)
            if age_int < 18:
                analysis_parts.append("Chez un patient jeune, une surveillance attentive est recommandée.")
            elif age_int > 60:
                analysis_parts.append("Chez un patient âgé, une vigilance accrue est conseillée.")
        except ValueError:
            pass
    
    # Recommandation générale
    if top_disease.confidence > 80:
        analysis_parts.append("Le diagnostic présente une forte probabilité.")
    elif top_disease.confidence > 60:
        analysis_parts.append("Le diagnostic est probable mais nécessite confirmation médicale.")
    else:
        analysis_parts.append("Plusieurs diagnostics sont possibles, une consultation médicale est recommandée.")
    
    return " ".join(analysis_parts)

@app.post("/diagnose", response_model=MedicalResponse)
async def diagnose(patient_data: PatientData):
    try:
        logger.info(f"Diagnostic demandé pour symptômes: {patient_data.symptoms}")
        
        # Conversion des symptômes en texte
        symptoms_text = ", ".join(patient_data.symptoms)
        
        # Tokenization
        inputs = tokenizer(
            symptoms_text,
            return_tensors="tf",
            truncation=True,
            padding=True,
            max_length=512
        )
        
        # Prédiction IA
        outputs = model(**inputs)
        probs = tf.nn.softmax(outputs.logits, axis=-1).numpy()[0]
        
        # Récupération des labels et scores
        labels = [model.config.id2label[i] for i in range(len(probs))]
        ai_predictions = [
            {"label": labels[i], "score": float(probs[i])} 
            for i in range(len(probs))
        ]
        
        enhanced_predictions = enhance_diagnosis_with_rules(patient_data.symptoms, ai_predictions)
        
        # Formatage des résultats avec traduction
        top_diagnoses = []
        for pred in enhanced_predictions[:3]:  # Prendre top 3 amélioré
            translated_name = translate_medical_term(pred["label"])
            top_diagnoses.append(DiagnosisResult(
                disease=pred["label"],
                confidence=round(pred["score"] * 100, 1),
                translated_name=translated_name
            ))
        
        # Détermination du niveau d'urgence
        urgency_level = determine_urgency_level(
            patient_data.symptoms,
            top_diagnoses[0].disease if top_diagnoses else "",
            patient_data.vitalSigns
        )
        
        # Génération des recommandations
        recommendations = generate_recommendations(urgency_level, top_diagnoses)
        
        # Génération de l'analyse
        analysis = generate_analysis(
            patient_data.symptoms,
            top_diagnoses,
            patient_data.age,
            patient_data.gender
        )
        
        logger.info(f"Diagnostic HYBRIDE terminé - Urgence: {urgency_level} - Top diagnostic: {top_diagnoses[0].translated_name if top_diagnoses else 'Aucun'}")
        
        return MedicalResponse(
            top_diagnoses=top_diagnoses,
            urgency_level=urgency_level,
            recommendations=recommendations,
            analysis=analysis
        )
        
    except Exception as e:
        logger.error(f"Erreur lors du diagnostic: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur interne: {str(e)}")
    try:
        logger.info(f"Diagnostic demandé pour symptômes: {patient_data.symptoms}")
        
        # Conversion des symptômes en texte
        symptoms_text = ", ".join(patient_data.symptoms)
        
        # Tokenization
        inputs = tokenizer(
            symptoms_text,
            return_tensors="tf",
            truncation=True,
            padding=True,
            max_length=512
        )
        
        # Prédiction
        outputs = model(**inputs)
        probs = tf.nn.softmax(outputs.logits, axis=-1).numpy()[0]
        
        # Récupération des labels et scores
        labels = [model.config.id2label[i] for i in range(len(probs))]
        predictions = [
            {"label": labels[i], "score": float(probs[i])} 
            for i in range(len(probs))
        ]
        
        # Tri par score décroissant et top 3
        predictions.sort(key=lambda x: x["score"], reverse=True)
        top_predictions = predictions[:3]
        
        # Formatage des résultats avec traduction intelligente
        top_diagnoses = []
        for pred in top_predictions:
            translated_name = translate_medical_term(pred["label"])
            top_diagnoses.append(DiagnosisResult(
                disease=pred["label"],
                confidence=round(pred["score"] * 100, 1),
                translated_name=translated_name
            ))
        
        # Détermination du niveau d'urgence intelligent
        urgency_level = determine_urgency_level(
            patient_data.symptoms,
            top_diagnoses[0].disease if top_diagnoses else "",
            patient_data.vitalSigns
        )
        
        # Génération des recommandations personnalisées (max 4)
        recommendations = generate_recommendations(urgency_level, top_diagnoses)
        
        # Génération de l'analyse contextuelle
        analysis = generate_analysis(
            patient_data.symptoms,
            top_diagnoses,
            patient_data.age,
            patient_data.gender
        )
        
        logger.info(f"Diagnostic terminé - Urgence: {urgency_level} - Top diagnostic: {top_diagnoses[0].translated_name if top_diagnoses else 'Aucun'}")
        
        return MedicalResponse(
            top_diagnoses=top_diagnoses,
            urgency_level=urgency_level,
            recommendations=recommendations,
            analysis=analysis
        )
        
    except Exception as e:
        logger.error(f"Erreur lors du diagnostic: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur interne: {str(e)}")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "service": "Medical Diagnosis API"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)