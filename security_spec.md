# Security Specification - Yemen Coder

## 1. Data Invariants
- A **Developer** can only be 'isVouched' if a **Sponsor** has created a **Vouch** for them. (Wait, for now, rules will handle simple field logic).
- A user can only modify their own **Profile**.
- **Jobs** can only be created by **Clients**.
- **Transactions** are system-immutable once completed (only system or specific roles).
- **Vouches** are immutable; only the sponsor can create them, and nobody can update them.
- All IDs must be valid strings.
- PII (email) must be kept private to the owner.

## 2. The Dirty Dozen Payloads

| Payload ID | Target Action | Collection | Description | Expected Result |
|------------|---------------|------------|-------------|-----------------|
| D1 | Create | /profiles/{any} | Attempting to create a profile for another UID. | PERMISSION_DENIED |
| D2 | Update | /profiles/{myUid} | Attempting to set `isVouched: true` as the user themselves. | PERMISSION_DENIED |
| D3 | Create | /jobs/{any} | Attempting to create a job as a 'developer' role. | PERMISSION_DENIED |
| D4 | Update | /jobs/{jobId} | Attempting to update a job I didn't create. | PERMISSION_DENIED |
| D5 | Create | /vouches/{any} | Attempting to vouch for myself. | PERMISSION_DENIED |
| D6 | Create | /vouches/{any} | Attempting to vouch as a 'developer' role (only sponsors allowed). | PERMISSION_DENIED |
| D7 | Create | /transactions/{any} | Attempting to create a 'completed' transaction directly. | PERMISSION_DENIED |
| D8 | List | /profiles | Attempting to list all profiles (requires server-side or specific filter). | PERMISSION_DENIED (if no filter) |
| D9 | Get | /profiles/{otherUid} | Reading another user's email field. | PERMISSION_DENIED |
| D10 | Create | /jobs/{any} | Creating a document with a 1MB ID string. | PERMISSION_DENIED |
| D11 | Update | /profiles/{myUid} | Changing the `id` field of the profile. | PERMISSION_DENIED |
| D12 | Create | /profiles/{myUid} | Creating a profile with a future `createdAt` timestamp. | PERMISSION_DENIED |

## 3. Test Runner Concept
The tests will verify these constraints in the security rules.
