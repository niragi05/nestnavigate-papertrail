import type { SprintScenario } from "@/features/paperTrailSprint/state/types";

export const preApprovalScenario: SprintScenario = {
  id: "pre_approval_paperwork_v1",
  lessonId: "lesson_mortgage_basics",
  title: "Paper Trail Sprint: Pre Approval Paperwork",
  shortDescription:
    "Sort the documents that show up before and during early mortgage preparation.",
  mode: "untimed",
  difficulty: "easy",
  estimatedMinutes: 2,
  rewardRule: {
    baseCoins: 25,
    perfectBonusCoins: 15,
    retryCoinCap: 20
  },
  successMessage:
    "Nice work. You are getting better at identifying the documents lenders usually ask for early in the process.",
  retryMessage:
    "Try again and focus on which documents help prove income, assets, and lender readiness.",
  stageBuckets: [
    {
      id: "pre_approval",
      label: "Pre Approval",
      description: "Documents used when preparing to talk to a lender and prove financial readiness.",
      order: 1
    },
    {
      id: "house_hunt",
      label: "House Hunt",
      description: "Documents and materials that become important while actively shopping for homes.",
      order: 2
    },
    {
      id: "under_contract",
      label: "Under Contract",
      description: "Documents that matter after an offer is accepted and the transaction is moving forward.",
      order: 3
    },
    {
      id: "closing",
      label: "Closing",
      description: "Documents reviewed or signed near the final closing stage.",
      order: 4
    }
  ],
  documentCards: [
    {
      id: "card_pay_stubs",
      title: "Recent Pay Stubs",
      shortDescription: "Proof of current income",
      correctBucketId: "pre_approval",
      explanation:
        "Lenders often ask for recent pay stubs early to verify current income and employment stability.",
      lessonTieIn: "Income verification is a core part of mortgage readiness.",
      order: 1
    },
    {
      id: "card_w2",
      title: "W2 Forms",
      shortDescription: "Tax wage summary",
      correctBucketId: "pre_approval",
      explanation:
        "W2 forms help a lender understand your income history and support the pre approval review.",
      lessonTieIn: "Income history matters when lenders estimate affordability.",
      order: 2
    },
    {
      id: "card_bank_statements",
      title: "Bank Statements",
      shortDescription: "Proof of available funds",
      correctBucketId: "pre_approval",
      explanation:
        "Bank statements help show assets, savings, and whether you have funds for down payment and reserves.",
      lessonTieIn: "Cash reserves and down payment readiness are key signals.",
      order: 3
    },
    {
      id: "card_preapproval_letter",
      title: "Pre Approval Letter",
      shortDescription: "Letter showing lender reviewed finances",
      correctBucketId: "house_hunt",
      explanation:
        "Once issued, the pre approval letter is most useful while house hunting because it helps show sellers you are a serious buyer.",
      lessonTieIn: "Pre approval helps strengthen your position when making offers.",
      order: 4
    },
    {
      id: "card_home_listing_notes",
      title: "Home Listing Notes",
      shortDescription: "Notes on homes you are comparing",
      correctBucketId: "house_hunt",
      explanation:
        "Listing notes are part of the house hunt stage because they help you compare options before making an offer.",
      lessonTieIn: "Shopping strategically helps avoid emotional decisions.",
      order: 5
    },
    {
      id: "card_purchase_contract",
      title: "Purchase Contract",
      shortDescription: "Accepted offer agreement",
      correctBucketId: "under_contract",
      explanation:
        "The purchase contract becomes central once the seller accepts your offer and the transaction moves under contract.",
      lessonTieIn: "This marks the transition from shopping to transaction execution.",
      order: 6
    },
    {
      id: "card_inspection_report",
      title: "Inspection Report",
      shortDescription: "Property condition findings",
      correctBucketId: "under_contract",
      explanation:
        "The inspection report usually appears after a home is under contract so the buyer can review property condition and negotiate repairs.",
      lessonTieIn: "Inspections reduce risk before closing.",
      order: 7
    },
    {
      id: "card_closing_disclosure",
      title: "Closing Disclosure",
      shortDescription: "Final loan and closing cost summary",
      correctBucketId: "closing",
      explanation:
        "The closing disclosure is reviewed near the end of the transaction and summarizes final loan terms and costs.",
      lessonTieIn: "Closing is when final cost details matter most.",
      order: 8
    }
  ]
};

export const offerToContractScenario: SprintScenario = {
  id: "offer_to_contract_v1",
  lessonId: "lesson_making_an_offer",
  title: "Paper Trail Sprint: Offer to Contract",
  shortDescription:
    "Practice identifying which documents matter once you move from house hunting into offer acceptance.",
  mode: "untimed",
  difficulty: "medium",
  estimatedMinutes: 2,
  rewardRule: {
    baseCoins: 25,
    perfectBonusCoins: 15,
    retryCoinCap: 20
  },
  successMessage:
    "Great job. You are learning which paperwork matters when a home moves from interest to agreement.",
  retryMessage: "Focus on the point where shopping ends and the formal transaction begins.",
  stageBuckets: [
    {
      id: "house_hunt",
      label: "House Hunt",
      description: "Comparing homes and preparing to make a decision.",
      order: 1
    },
    {
      id: "offer_stage",
      label: "Offer Stage",
      description: "Documents tied directly to making or negotiating an offer.",
      order: 2
    },
    {
      id: "under_contract",
      label: "Under Contract",
      description: "Documents that matter after acceptance.",
      order: 3
    },
    {
      id: "closing",
      label: "Closing",
      description: "Final transaction paperwork.",
      order: 4
    }
  ],
  documentCards: [
    {
      id: "s2_card_listing_comparison",
      title: "Home Comparison Sheet",
      shortDescription: "Compare candidate homes",
      correctBucketId: "house_hunt",
      explanation:
        "A home comparison sheet helps while evaluating options before submitting an offer.",
      lessonTieIn: "Comparison reduces rushed decisions.",
      order: 1
    },
    {
      id: "s2_card_preapproval_letter",
      title: "Pre Approval Letter",
      shortDescription: "Supports your offer",
      correctBucketId: "offer_stage",
      explanation:
        "A pre approval letter is often attached or referenced during the offer stage to strengthen credibility.",
      lessonTieIn: "Sellers want confidence that financing is realistic.",
      order: 2
    },
    {
      id: "s2_card_offer_letter",
      title: "Offer Package",
      shortDescription: "Price and terms proposal",
      correctBucketId: "offer_stage",
      explanation: "The offer package defines the price and terms being proposed to the seller.",
      lessonTieIn: "This is the central document of the offer stage.",
      order: 3
    },
    {
      id: "s2_card_counter_offer",
      title: "Counter Offer",
      shortDescription: "Updated seller or buyer terms",
      correctBucketId: "offer_stage",
      explanation:
        "A counter offer still belongs to the offer stage because negotiation is ongoing until both sides agree.",
      lessonTieIn: "Negotiation can happen before the contract is final.",
      order: 4
    },
    {
      id: "s2_card_purchase_agreement",
      title: "Signed Purchase Agreement",
      shortDescription: "Accepted agreement",
      correctBucketId: "under_contract",
      explanation:
        "Once signed by both parties, the deal is under contract and the purchase agreement becomes the key governing document.",
      lessonTieIn: "Mutual acceptance changes the stage of the transaction.",
      order: 5
    },
    {
      id: "s2_card_earnest_receipt",
      title: "Earnest Money Receipt",
      shortDescription: "Proof of deposit",
      correctBucketId: "under_contract",
      explanation:
        "Earnest money is usually handled after the offer is accepted and the contract is active.",
      lessonTieIn: "This deposit shows serious intent to complete the purchase.",
      order: 6
    },
    {
      id: "s2_card_appraisal_report",
      title: "Appraisal Report",
      shortDescription: "Value estimate by appraiser",
      correctBucketId: "under_contract",
      explanation:
        "The appraisal usually happens after contract acceptance as part of financing and transaction validation.",
      lessonTieIn: "Lenders use appraisals to verify value supports the loan.",
      order: 7
    },
    {
      id: "s2_card_closing_disclosure",
      title: "Closing Disclosure",
      shortDescription: "Final financial summary",
      correctBucketId: "closing",
      explanation:
        "Closing disclosure belongs near the end because it summarizes final loan terms and costs before signing.",
      lessonTieIn: "Final cost transparency is a closing stage activity.",
      order: 8
    }
  ]
};

export const closingDayScenario: SprintScenario = {
  id: "closing_day_documents_v1",
  lessonId: "lesson_closing_basics",
  title: "Paper Trail Sprint: Closing Day Documents",
  shortDescription: "Sort which documents matter at closing versus earlier stages in the process.",
  mode: "untimed",
  difficulty: "hard",
  estimatedMinutes: 2,
  rewardRule: {
    baseCoins: 25,
    perfectBonusCoins: 15,
    retryCoinCap: 20
  },
  successMessage: "You are building confidence around the final paperwork stage of homebuying.",
  retryMessage: "Think about which documents are reviewed right before the purchase is finalized.",
  stageBuckets: [
    {
      id: "pre_approval",
      label: "Pre Approval",
      description: "Early lender readiness stage.",
      order: 1
    },
    {
      id: "under_contract",
      label: "Under Contract",
      description: "After offer acceptance and before final closing.",
      order: 2
    },
    {
      id: "closing",
      label: "Closing",
      description: "Documents reviewed or signed at the finish line.",
      order: 3
    },
    {
      id: "after_move_in",
      label: "After Move In",
      description: "Documents or records you keep after the transaction is complete.",
      order: 4
    }
  ],
  documentCards: [
    {
      id: "s3_card_bank_statements",
      title: "Bank Statements",
      shortDescription: "Early proof of funds",
      correctBucketId: "pre_approval",
      explanation: "Bank statements usually help earlier in the financing process, not on closing day itself.",
      lessonTieIn: "Assets are reviewed early for lender readiness.",
      order: 1
    },
    {
      id: "s3_card_title_commitment",
      title: "Title Commitment",
      shortDescription: "Title review before closing",
      correctBucketId: "under_contract",
      explanation: "Title review happens while under contract so issues can be resolved before closing.",
      lessonTieIn: "Clear title is essential before ownership transfers.",
      order: 2
    },
    {
      id: "s3_card_final_walkthrough_notes",
      title: "Final Walkthrough Notes",
      shortDescription: "Check property before final signing",
      correctBucketId: "under_contract",
      explanation:
        "The final walkthrough happens right before closing, but it is still part of verifying the contract is being fulfilled before signing.",
      lessonTieIn: "This protects the buyer before the deal is finalized.",
      order: 3
    },
    {
      id: "s3_card_closing_disclosure",
      title: "Closing Disclosure",
      shortDescription: "Final loan and fee summary",
      correctBucketId: "closing",
      explanation: "Closing disclosure is a key closing document because it details final loan terms and costs.",
      lessonTieIn: "Buyers should review this carefully before signing.",
      order: 4
    },
    {
      id: "s3_card_promissory_note",
      title: "Promissory Note",
      shortDescription: "Borrower promise to repay",
      correctBucketId: "closing",
      explanation: "The promissory note is signed at closing and outlines the borrower’s promise to repay the loan.",
      lessonTieIn: "This is one of the central legal loan documents.",
      order: 5
    },
    {
      id: "s3_card_deed",
      title: "Deed",
      shortDescription: "Ownership transfer document",
      correctBucketId: "closing",
      explanation: "The deed is part of the final ownership transfer process handled at closing.",
      lessonTieIn: "This document supports the legal transfer of property ownership.",
      order: 6
    },
    {
      id: "s3_card_settlement_statement",
      title: "Settlement Statement",
      shortDescription: "Summary of money movement",
      correctBucketId: "closing",
      explanation:
        "The settlement statement is a closing stage document showing who pays what in the transaction.",
      lessonTieIn: "Money movement becomes final at closing.",
      order: 7
    },
    {
      id: "s3_card_home_records_folder",
      title: "Home Records Folder",
      shortDescription: "Keep important purchase records",
      correctBucketId: "after_move_in",
      explanation:
        "After move in, buyers should keep copies of closing and ownership documents in a safe location.",
      lessonTieIn: "Good record keeping matters after the transaction is complete.",
      order: 8
    }
  ]
};

export const sprintScenarios = [preApprovalScenario, offerToContractScenario, closingDayScenario];

export const orderedSprintScenarios = sprintScenarios;
export const orderedSprintScenarioIds = orderedSprintScenarios.map((scenario) => scenario.id);

export function getScenarioById(id: string) {
  return sprintScenarios.find((scenario) => scenario.id === id) ?? null;
}

export function getPreviewDocumentTitles(limit = 8) {
  const titles = [
    ...orderedSprintScenarios[0].documentCards.slice(0, 3).map((card) => card.title),
    ...orderedSprintScenarios[1].documentCards.slice(1, 4).map((card) => card.title),
    ...orderedSprintScenarios[2].documentCards.slice(3, 5).map((card) => card.title)
  ];

  return [...new Set(titles)].slice(0, limit);
}
