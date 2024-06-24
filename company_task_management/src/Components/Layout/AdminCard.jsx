/* eslint-disable react/prop-types */
import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { ArrowDown as ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown"
import { ArrowUp as ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp"
import { CurrencyDollar as CurrencyDollarIcon } from "@phosphor-icons/react/dist/ssr/CurrencyDollar"
import { Skeleton } from "@mui/material"

function AdminCard({ name, value, textColor, Pending }) {
  return (
    <>
      <Card sx={{ width: 400, margin: "auto", border: "1px solid gray" }}>
        <CardContent>
          <Stack spacing={3}>
            <Stack
              direction="row"
              sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  {name}
                </Typography>
                <Typography
                  variant="h4"
                  style={textColor ? { color: textColor } : {}}
                >
                  {Pending ? (
                    <Skeleton variant="rectangular" width={50} height={30} />
                  ) : (
                    value
                  )}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: "var(--mui-palette-primary-main)",
                  height: "56px",
                  width: "56px",
                }}
              >
                <CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />
              </Avatar>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default AdminCard
