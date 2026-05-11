import { useEffect, useState, useCallback } from 'react';
import { supabase } from './lib/supabase';
import { useToast } from './contexts/ToastContext';
import { Header } from './components/Header';
import { Legend } from './components/Legend';
import { KPITable } from './components/KPITable';
import { PerformanceScore } from './components/PerformanceScore';
import { DailyChecklist } from './components/DailyChecklist';
import { AlertZone } from './components/AlertZone';
import { MonthlyObjectives } from './components/MonthlyObjectives';
import { PerformanceEvolution } from './components/PerformanceEvolution';
import { Footer } from './components/Footer';
import {
  KPIValue,
  ChecklistItem,
  AlertItem,
  MonthlyObjective,
  MonthlyPerformance
} from './types/database';

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000000';

export default function App() {
  const { showToast } = useToast();
  const [kpis, setKpis] = useState<KPIValue[]>([]);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [alertItems, setAlertItems] = useState<AlertItem[]>([]);
  const [objectives, setObjectives] = useState<MonthlyObjective[]>([]);
  const [performances, setPerformances] = useState<MonthlyPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    const cleanup = subscribeToChanges();
    return cleanup;
  }, []);

  const loadData = async () => {
    try {
      const [kpisRes, checklistRes, alertsRes, objectivesRes, performancesRes] = await Promise.all([
        supabase.from('kpi_values').select('*').eq('user_id', DEFAULT_USER_ID),
        supabase.from('checklist_items').select('*').eq('user_id', DEFAULT_USER_ID),
        supabase.from('alert_items').select('*').eq('user_id', DEFAULT_USER_ID),
        supabase.from('monthly_objectives').select('*').eq('user_id', DEFAULT_USER_ID),
        supabase.from('monthly_performance').select('*').eq('user_id', DEFAULT_USER_ID)
      ]);

      if (kpisRes.error) throw new Error(`KPI error: ${kpisRes.error.message}`);
      if (checklistRes.error) throw new Error(`Checklist error: ${checklistRes.error.message}`);
      if (alertsRes.error) throw new Error(`Alert error: ${alertsRes.error.message}`);
      if (objectivesRes.error) throw new Error(`Objectives error: ${objectivesRes.error.message}`);
      if (performancesRes.error) throw new Error(`Performance error: ${performancesRes.error.message}`);

      if (kpisRes.data && kpisRes.data.length > 0) {
        setKpis(kpisRes.data);
      } else {
        await initializeUserData();
        await loadData();
        return;
      }

      if (checklistRes.data) setChecklistItems(checklistRes.data);
      if (alertsRes.data) setAlertItems(alertsRes.data);
      if (objectivesRes.data) setObjectives(objectivesRes.data);
      if (performancesRes.data) setPerformances(performancesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error instanceof Error ? error.message : 'Erreur de chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const initializeUserData = async () => {
    const kpiDefaults = [
      { kpi_name: 'Mandats/semaine', target_value: '≥ 10', alert_value: '< 7 (2 sem.)', display_order: 1, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Délai mise en ligne', target_value: '< 24h', alert_value: '> 36h', display_order: 2, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Contrôle qualité 24h', target_value: '100%', alert_value: '> 5% erreurs', display_order: 3, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Lead → RDV', target_value: '≥ 35%', alert_value: '< 25%', display_order: 4, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Visite → Réservation', target_value: '≥ 75%', alert_value: '< 55%', display_order: 5, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Délai moyen vente', target_value: '< 45j', alert_value: '> 60j', display_order: 6, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Réponse aux leads', target_value: '< 30min', alert_value: '> 2h', display_order: 7, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Note Google', target_value: '≥ 4.5 ⭐', alert_value: '< 4.3 ⭐', display_order: 8, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Capture d\'avis', target_value: '≥ 70%', alert_value: '< 40%', display_order: 9, user_id: DEFAULT_USER_ID },
      { kpi_name: '🔧 Taux FMR', target_value: '≥ 80%', alert_value: '< 50%', display_order: 10, user_id: DEFAULT_USER_ID },
      { kpi_name: '🛡️ Taux Garantie Mécanique', target_value: '≥ 90%', alert_value: '< 70%', display_order: 11, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Marge unitaire', target_value: '1 250€', alert_value: '< 800€', display_order: 12, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Rotation mandats', target_value: '35%/mois', alert_value: '< 20%', display_order: 13, user_id: DEFAULT_USER_ID },
      { kpi_name: 'Mandats/collaborateur', target_value: '30-50', alert_value: '< 30 ou > 50', display_order: 14, user_id: DEFAULT_USER_ID },
      { kpi_name: 'CA vs objectif', target_value: '100%', alert_value: '< 85%', display_order: 15, user_id: DEFAULT_USER_ID }
    ];

    const checklistDefaults = [
      { item_name: 'Consultation Dashboard BH CAR', estimated_time: '3 min', display_order: 1, user_id: DEFAULT_USER_ID },
      { item_name: 'Contrôle qualité diffusion J-1', estimated_time: '4 min', display_order: 2, user_id: DEFAULT_USER_ID },
      { item_name: 'Check ventes additionnelles J-1', estimated_time: '2 min', display_order: 3, user_id: DEFAULT_USER_ID },
      { item_name: 'Vérification alertes KPI', estimated_time: '2 min', display_order: 4, user_id: DEFAULT_USER_ID },
      { item_name: 'Leads de la veille traités', estimated_time: '3 min', display_order: 5, user_id: DEFAULT_USER_ID },
      { item_name: 'Priorités du jour définies', estimated_time: '1 min', display_order: 6, user_id: DEFAULT_USER_ID }
    ];

    const alertDefaults = [
      { alert_text: '', display_order: 1, user_id: DEFAULT_USER_ID },
      { alert_text: '', display_order: 2, user_id: DEFAULT_USER_ID },
      { alert_text: '', display_order: 3, user_id: DEFAULT_USER_ID }
    ];

    const objectiveDefaults = [
      { priority: 1, user_id: DEFAULT_USER_ID },
      { priority: 2, user_id: DEFAULT_USER_ID },
      { priority: 3, user_id: DEFAULT_USER_ID }
    ];

    const performanceDefaults = [
      { month: 'Jan', month_number: 1, user_id: DEFAULT_USER_ID },
      { month: 'Fév', month_number: 2, user_id: DEFAULT_USER_ID },
      { month: 'Mar', month_number: 3, user_id: DEFAULT_USER_ID },
      { month: 'Avr', month_number: 4, user_id: DEFAULT_USER_ID }
    ];

    await Promise.all([
      supabase.from('kpi_values').insert(kpiDefaults),
      supabase.from('checklist_items').insert(checklistDefaults),
      supabase.from('alert_items').insert(alertDefaults),
      supabase.from('monthly_objectives').insert(objectiveDefaults),
      supabase.from('monthly_performance').insert(performanceDefaults)
    ]);
  };

  const subscribeToChanges = () => {
    const kpiChannel = supabase
      .channel('kpi_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'kpi_values' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setKpis((prev) => prev.map((kpi) => (kpi.id === payload.new.id ? payload.new as KPIValue : kpi)));
        }
      })
      .subscribe();

    const checklistChannel = supabase
      .channel('checklist_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'checklist_items' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setChecklistItems((prev) => prev.map((item) => (item.id === payload.new.id ? payload.new as ChecklistItem : item)));
        }
      })
      .subscribe();

    const alertChannel = supabase
      .channel('alert_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alert_items' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setAlertItems((prev) => prev.map((item) => (item.id === payload.new.id ? payload.new as AlertItem : item)));
        }
      })
      .subscribe();

    const objectiveChannel = supabase
      .channel('objective_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'monthly_objectives' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setObjectives((prev) => prev.map((obj) => (obj.id === payload.new.id ? payload.new as MonthlyObjective : obj)));
        }
      })
      .subscribe();

    const performanceChannel = supabase
      .channel('performance_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'monthly_performance' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setPerformances((prev) => prev.map((perf) => (perf.id === payload.new.id ? payload.new as MonthlyPerformance : perf)));
        }
      })
      .subscribe();

    return () => {
      kpiChannel.unsubscribe();
      checklistChannel.unsubscribe();
      alertChannel.unsubscribe();
      objectiveChannel.unsubscribe();
      performanceChannel.unsubscribe();
    };
  };

  const updateKPI = useCallback(async (id: string, updates: Partial<KPIValue>) => {
    try {
      const { error } = await supabase
        .from('kpi_values')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setKpis((prev) => prev.map((kpi) => (kpi.id === id ? { ...kpi, ...updates } : kpi)));
      showToast('KPI mis à jour avec succès', 'success');
    } catch (error) {
      console.error('Error updating KPI:', error);
      showToast('Erreur lors de la mise à jour du KPI', 'error');
    }
  }, [showToast]);

  const toggleChecklistItem = useCallback(async (id: string, isChecked: boolean) => {
    try {
      const { error } = await supabase
        .from('checklist_items')
        .update({ is_checked: isChecked, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setChecklistItems((prev) => prev.map((item) => (item.id === id ? { ...item, is_checked: isChecked } : item)));
      showToast('Checklist mise à jour', 'success');
    } catch (error) {
      console.error('Error updating checklist item:', error);
      showToast('Erreur lors de la mise à jour', 'error');
    }
  }, [showToast]);

  const updateAlert = useCallback(async (id: string, text: string) => {
    try {
      const { error } = await supabase
        .from('alert_items')
        .update({ alert_text: text, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setAlertItems((prev) => prev.map((item) => (item.id === id ? { ...item, alert_text: text } : item)));
      showToast('Alerte mise à jour', 'success');
    } catch (error) {
      console.error('Error updating alert:', error);
      showToast('Erreur lors de la mise à jour', 'error');
    }
  }, [showToast]);

  const updateObjective = useCallback(async (id: string, updates: Partial<MonthlyObjective>) => {
    try {
      const { error } = await supabase
        .from('monthly_objectives')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setObjectives((prev) => prev.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj)));
      showToast('Objectif mis à jour', 'success');
    } catch (error) {
      console.error('Error updating objective:', error);
      showToast('Erreur lors de la mise à jour', 'error');
    }
  }, [showToast]);

  const updatePerformance = useCallback(async (id: string, updates: Partial<MonthlyPerformance>) => {
    try {
      const { error } = await supabase
        .from('monthly_performance')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setPerformances((prev) => prev.map((perf) => (perf.id === id ? { ...perf, ...updates } : perf)));
      showToast('Performance mise à jour', 'success');
    } catch (error) {
      console.error('Error updating performance:', error);
      showToast('Erreur lors de la mise à jour', 'error');
    }
  }, [showToast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
          <p className="text-lg md:text-xl text-gray-700 font-semibold">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur de connexion</h2>
            <p className="text-gray-600 mb-4">Impossible de charger les données du tableau de bord.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800 font-mono">{error}</p>
          </div>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              loadData();
            }}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="dashboard-container" className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="max-w-7xl mx-auto">
          <Header
            kpis={kpis}
            checklistItems={checklistItems}
            alertItems={alertItems}
            objectives={objectives}
            performances={performances}
          />

          <div className="px-4 md:px-8 py-8 md:py-12 space-y-6 md:space-y-8">
            <Legend />
            <KPITable kpis={kpis} onUpdateKPI={updateKPI} />
            <PerformanceScore kpis={kpis} />
            <DailyChecklist items={checklistItems} onToggleItem={toggleChecklistItem} />
            <AlertZone alerts={alertItems} onUpdateAlert={updateAlert} />
            <MonthlyObjectives objectives={objectives} onUpdateObjective={updateObjective} />
            <PerformanceEvolution performances={performances} onUpdatePerformance={updatePerformance} />
          </div>

          <Footer
            kpis={kpis}
            checklistItems={checklistItems}
            alertItems={alertItems}
            objectives={objectives}
            performances={performances}
          />
        </div>
      </div>
    </>
  );
}
