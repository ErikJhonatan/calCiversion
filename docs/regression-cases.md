# Regression cases

Prepared for this change. **Not executed.** Tests, manual checks, lint and builds require explicit user authorization. Use isolated fixtures; never run destructive cases against production.

| Case | Input or setup | Expected outcome |
| --- | --- | --- |
| Inputs | Whitespace name; NaN/zero proceeds; missing or negative investor amount | Form stays available and reports invalid data |
| Partial form | First investor empty, last complete; click calculate twice | No partial or duplicate investor records |
| Globals | Change fields in a browser without implicit global event | Explicit event parameters work; loop index remains local |
| Totals | 0.1 and 0.2 invested; invalid zero capital | Cent-based total=0.30; invalid total rejected |
| Navigation | Go back from number of investors to utility | No error dialog for investor count=0 |
