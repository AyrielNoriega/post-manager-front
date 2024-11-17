import { ReactNode } from "react";
import { Container, CssBaseline } from "@mui/material"

import AppTheme from "../../theme/AppTheme"
import Footer from "../Footer"


interface GeneralTemplateProps {
    children: ReactNode;
    window?: () => Window;
}


export const GeneralTemplate = ({ children }: GeneralTemplateProps) => {
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />

            <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
            >
                {children}
            </Container>
            <Footer />
        </AppTheme>
    )
}
