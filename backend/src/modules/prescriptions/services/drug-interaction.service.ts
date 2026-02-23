import { Injectable } from '@nestjs/common';

export interface DrugInteractionResult {
  drug1: string;
  drug2: string;
  severity: 'low' | 'moderate' | 'high';
  description: string;
}

@Injectable()
export class DrugInteractionService {
  /**
   * Check for drug interactions between two drugs
   */
  async checkInteraction(drug1: string, drug2: string): Promise<DrugInteractionResult | null> {
    // Stub implementation - returns null (no interaction found)
    return null;
  }

  /**
   * Check multiple drugs for interactions
   */
  async checkMultipleInteractions(drugs: string[]): Promise<DrugInteractionResult[]> {
    // Stub implementation - returns empty array
    return [];
  }

  /**
   * Check interactions (alias for checkInteraction)
   */
  async checkInteractions(drug1: string, drug2: string): Promise<DrugInteractionResult | null> {
    return this.checkInteraction(drug1, drug2);
  }

  /**
   * Get interactions by medication
   */
  async getInteractionsByMedication(medicationId: string): Promise<DrugInteractionResult[]> {
    // Stub implementation - returns empty array
    return [];
  }
}
